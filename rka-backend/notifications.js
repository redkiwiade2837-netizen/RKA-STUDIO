// Records a completed order to a Google Sheet and emails a notification.
// Both are best-effort: a failure here must never undo or block a payment
// that has already succeeded, so every call site wraps these in try/catch
// and only logs on failure.
const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const {
  GOOGLE_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
  GOOGLE_SHEET_ID,
  EMAIL_USER,
  EMAIL_APP_PASSWORD,
  EMAIL_TO,
} = process.env;

const sheetsConfigured = Boolean(
  GOOGLE_SERVICE_ACCOUNT_EMAIL && GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY && GOOGLE_SHEET_ID
);
const emailConfigured = Boolean(EMAIL_USER && EMAIL_APP_PASSWORD && EMAIL_TO);

let sheetsClient = null;
function getSheetsClient() {
  if (!sheetsClient) {
    const auth = new google.auth.JWT({
      email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Render/most .env loaders store the key with literal "\n" sequences.
      key: GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    sheetsClient = google.sheets({ version: "v4", auth });
  }
  return sheetsClient;
}

// The default tab name depends on the sheet owner's language (e.g. "Sheet1"
// vs "시트1"), so it's resolved from the spreadsheet itself rather than
// assumed, and cached for the life of the process.
let firstSheetTitle = null;
async function getFirstSheetTitle() {
  if (!firstSheetTitle) {
    const { data } = await getSheetsClient().spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID });
    firstSheetTitle = data.sheets[0].properties.title;
  }
  return firstSheetTitle;
}

// Contact inquiries live in their own tab (not mixed in with order rows,
// which have a different column shape) on the same spreadsheet, so only one
// GOOGLE_SHEET_ID needs to be configured. Created on first use if missing —
// a fresh spreadsheet won't have a "Contact" tab yet.
const CONTACT_SHEET_TITLE = "Contact";
let contactSheetEnsured = false;
async function ensureContactSheet() {
  if (contactSheetEnsured) return;
  const { data } = await getSheetsClient().spreadsheets.get({ spreadsheetId: GOOGLE_SHEET_ID });
  const exists = data.sheets.some((s) => s.properties.title === CONTACT_SHEET_TITLE);
  if (!exists) {
    await getSheetsClient().spreadsheets.batchUpdate({
      spreadsheetId: GOOGLE_SHEET_ID,
      requestBody: {
        requests: [{ addSheet: { properties: { title: CONTACT_SHEET_TITLE } } }],
      },
    });
    await getSheetsClient().spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${CONTACT_SHEET_TITLE}!A:E`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [["시간", "문의유형", "이메일", "문의내용", "상태"]] },
    });
  }
  contactSheetEnsured = true;
}

let mailTransport = null;
function getMailTransport() {
  if (!mailTransport) {
    mailTransport = nodemailer.createTransport({
      service: "gmail",
      auth: { user: EMAIL_USER, pass: EMAIL_APP_PASSWORD },
    });
  }
  return mailTransport;
}

function formatItems(items) {
  return items.map(({ title, quantity }) => `${title} x${quantity}`).join(", ");
}

async function appendOrderToSheet(order) {
  if (!sheetsConfigured) return;
  const { timestamp, paymentMethod, orderId, shippingInfo, items, total } = order;

  const sheetTitle = await getFirstSheetTitle();
  await getSheetsClient().spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${sheetTitle}!A:I`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [[
        timestamp,
        paymentMethod,
        orderId,
        shippingInfo.email,
        `${shippingInfo.firstName} ${shippingInfo.lastName}`,
        shippingInfo.address,
        `${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
        formatItems(items),
        total,
      ]],
    },
  });
}

async function sendOrderEmail(order) {
  if (!emailConfigured) return;
  const { timestamp, paymentMethod, orderId, shippingInfo, items, total } = order;

  const lines = [
    `Payment method: ${paymentMethod}`,
    `Order ID: ${orderId}`,
    `Time: ${timestamp}`,
    "",
    `Name: ${shippingInfo.firstName} ${shippingInfo.lastName}`,
    `Email: ${shippingInfo.email}`,
    `Address: ${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state} ${shippingInfo.zip}`,
    "",
    `Items: ${formatItems(items)}`,
    `Total: $${total}`,
  ];

  await getMailTransport().sendMail({
    from: EMAIL_USER,
    to: EMAIL_TO,
    subject: `New order — ${orderId}`,
    text: lines.join("\n"),
  });
}

async function notifyOrderCompleted(order) {
  const results = await Promise.allSettled([
    appendOrderToSheet(order),
    sendOrderEmail(order),
  ]);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`Order notification failed (${i === 0 ? "sheet" : "email"}):`, result.reason);
    }
  });
}

// Contact inquiries are appended with 상태="신규" — the RKA AI 직원 desktop app
// (하늘) polls this same sheet/tab looking for that status, drafts a reply,
// and only marks it 처리됨 once a person approves sending it. This function
// only records the inquiry; it never sends a reply itself.
async function appendContactToSheet(inquiry) {
  if (!sheetsConfigured) return;
  await ensureContactSheet();
  const { timestamp, category, email, message } = inquiry;
  await getSheetsClient().spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: `${CONTACT_SHEET_TITLE}!A:E`,
    valueInputOption: "RAW",
    insertDataOption: "INSERT_ROWS",
    requestBody: { values: [[timestamp, category, email, message, "신규"]] },
  });
}

async function sendContactAlertEmail(inquiry) {
  if (!emailConfigured) return;
  const { timestamp, category, email, message } = inquiry;
  await getMailTransport().sendMail({
    from: EMAIL_USER,
    to: EMAIL_TO,
    subject: `[RKA 웹사이트 문의] ${category}`,
    text: [
      `문의 유형: ${category}`,
      `보낸 사람: ${email}`,
      `시간: ${timestamp}`,
      "",
      message,
    ].join("\n"),
  });
}

async function notifyContactInquiry(inquiry) {
  const results = await Promise.allSettled([
    appendContactToSheet(inquiry),
    sendContactAlertEmail(inquiry),
  ]);
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      console.error(`Contact notification failed (${i === 0 ? "sheet" : "email"}):`, result.reason);
    }
  });
}

module.exports = { notifyOrderCompleted, notifyContactInquiry, sheetsConfigured, emailConfigured };
