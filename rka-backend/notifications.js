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

  await getSheetsClient().spreadsheets.values.append({
    spreadsheetId: GOOGLE_SHEET_ID,
    range: "Sheet1!A:I",
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

module.exports = { notifyOrderCompleted, sheetsConfigured, emailConfigured };
