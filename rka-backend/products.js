// Server-side source of truth for prices, mirroring rka-app/src/data/data.js
// (furniture + items). Never trust a price/amount sent by the client.
const PRODUCTS = {
  f001: { title: 'BRUTALIST CHAIR', price: 1200 },
  f002: { title: 'SLAB TABLE', price: 3400 },
  f003: { title: 'SHELF UNIT', price: 890 },
  f004: { title: 'PENDANT LAMP', price: 540 },
  i001: { title: 'PRECISION PENCIL', price: 38 },
  i002: { title: 'STEEL PAPERCLIP', price: 22 },
  i003: { title: 'CONCRETE DESK TRAY', price: 120 },
  i004: { title: 'GRAPHITE STICK', price: 14 },
  i005: { title: 'BRASS RULER', price: 85 },
};

const SHIPPING = 25.00;
const TAX_RATE = 0.085;

function priceCartItems(items) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty.');
  }

  let subtotal = 0;
  for (const { id, quantity } of items) {
    const product = PRODUCTS[id];
    if (!product) {
      throw new Error(`Unknown product id: ${id}`);
    }
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(`Invalid quantity for product ${id}.`);
    }
    subtotal += product.price * quantity;
  }

  // Round each component first, then sum the rounded values for the total.
  // PayPal requires amount.value to exactly equal item_total + tax + shipping;
  // summing the unrounded numbers and rounding only at the end can land a
  // cent off (e.g. 85 * 0.085 = 7.2250000000000005, which rounds to 7.23,
  // while 85 + 25 + 7.225 rounds to 117.22 instead of 117.23) and PayPal
  // rejects the order with AMOUNT_MISMATCH.
  const subtotalRounded = Number(subtotal.toFixed(2));
  const shippingRounded = Number(SHIPPING.toFixed(2));
  const taxRounded = Number((subtotal * TAX_RATE).toFixed(2));
  const total = Number((subtotalRounded + shippingRounded + taxRounded).toFixed(2));

  return {
    subtotal: subtotalRounded,
    shipping: shippingRounded,
    tax: taxRounded,
    total,
  };
}

module.exports = { PRODUCTS, priceCartItems };
