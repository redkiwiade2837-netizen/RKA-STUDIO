require("dotenv").config();
const crypto = require("crypto");
const express = require("express");
const cors = require("cors");
const { PRODUCTS, priceCartItems } = require("./products");

const app = express();

app.use(cors());
app.use(express.json());

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_BASE, TOSS_SECRET_KEY, TOSS_API_BASE, PORT } = process.env;

if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET || !PAYPAL_API_BASE) {
  console.error("Missing required PayPal env vars. Copy .env.example to .env and fill in PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PAYPAL_API_BASE.");
  process.exit(1);
}

if (!TOSS_SECRET_KEY || !TOSS_API_BASE) {
  console.error("Missing required Toss env vars. Copy .env.example to .env and fill in TOSS_SECRET_KEY, TOSS_API_BASE.");
  process.exit(1);
}

/**
 * Generate an OAuth 2.0 access token for authenticating with PayPal REST APIs.
 */
async function generateAccessToken() {
  const auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
  
  const response = await fetch(`${PAYPAL_API_BASE}/v1/oauth2/token`, {
    method: "POST",
    body: "grant_type=client_credentials",
    headers: {
      Authorization: `Basic ${auth}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const data = await response.json();
  return data.access_token;
}

/**
 * Create an order to start the transaction.
 */
app.post("/api/orders", async (req, res) => {
  try {
    const { items } = req.body;
    let pricing;
    try {
      pricing = priceCartItems(items);
    } catch (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API_BASE}/v2/checkout/orders`;
    const payload = {
      intent: "CAPTURE",
      purchase_units: [
        {
          amount: {
            currency_code: "USD",
            value: pricing.total.toFixed(2),
            breakdown: {
              item_total: { currency_code: "USD", value: pricing.subtotal.toFixed(2) },
              shipping: { currency_code: "USD", value: pricing.shipping.toFixed(2) },
              tax_total: { currency_code: "USD", value: pricing.tax.toFixed(2) },
            },
          },
        },
      ],
    };

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Failed to create order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

/**
 * Capture payment for the created order to complete the transaction.
 */
app.post("/api/orders/:orderID/capture", async (req, res) => {
  try {
    const { orderID } = req.params;
    const accessToken = await generateAccessToken();
    const url = `${PAYPAL_API_BASE}/v2/checkout/orders/${orderID}/capture`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Failed to capture order:", error);
    res.status(500).json({ error: "Failed to capture order." });
  }
});

/**
 * Toss Payments (V2 Payment Widget) integration.
 *
 * Flow: the client asks us to price its cart and gets back an orderId +
 * amount it must use when calling widgets.requestPayment(). After the user
 * completes (or cancels) payment on Toss's page, Toss redirects back to our
 * successUrl/failUrl with paymentKey/orderId/amount in the query string —
 * those are just what the browser sends, not proof of payment. We look up
 * the amount WE priced for that orderId and confirm with Toss's server API
 * using that stored amount, never the one echoed back from the client.
 */
const tossOrders = new Map(); // orderId -> { amount, createdAt }

function buildOrderName(items) {
  if (items.length === 1) return items[0].title;
  return `${items[0].title} 외 ${items.length - 1}건`;
}

app.post("/api/toss/orders", (req, res) => {
  try {
    const { items } = req.body;
    let pricing;
    try {
      pricing = priceCartItems(items);
    } catch (validationError) {
      return res.status(400).json({ error: validationError.message });
    }

    // Test-mode placeholder: this project prices products in USD, but Toss
    // only settles in KRW, so the dollar total is used as a plain KRW number
    // (no real currency conversion) until a real exchange rate is wired in.
    const amount = Math.round(pricing.total);
    const orderId = `rka_${crypto.randomUUID()}`;
    const orderName = buildOrderName(
      items.map(({ id }) => ({ title: PRODUCTS[id].title }))
    );

    tossOrders.set(orderId, { amount, createdAt: Date.now() });

    res.json({ orderId, amount, orderName });
  } catch (error) {
    console.error("Failed to create Toss order:", error);
    res.status(500).json({ error: "Failed to create order." });
  }
});

app.post("/api/toss/confirm", async (req, res) => {
  try {
    const { paymentKey, orderId } = req.body;
    const order = tossOrders.get(orderId);
    if (!order) {
      return res.status(400).json({ error: "Unknown or expired orderId." });
    }

    const auth = Buffer.from(`${TOSS_SECRET_KEY}:`).toString("base64");
    const response = await fetch(`${TOSS_API_BASE}/v1/payments/confirm`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
        "Idempotency-Key": crypto.randomUUID(),
      },
      body: JSON.stringify({ paymentKey, orderId, amount: order.amount }),
    });

    const data = await response.json();
    if (response.ok) tossOrders.delete(orderId);
    res.status(response.status).json(data);
  } catch (error) {
    console.error("Failed to confirm Toss payment:", error);
    res.status(500).json({ error: "Failed to confirm payment." });
  }
});

const port = PORT || 5000;
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});
