import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import App from './App';
import { CartProvider } from './context/CartContext';
import './index.css';

const container = document.getElementById('root');
const root = createRoot(container);

const paypalOptions = {
    "client-id": import.meta.env.VITE_PAYPAL_CLIENT_ID || "test",
    currency: "USD",
    intent: "capture"
};

root.render(
  <React.StrictMode>
    <PayPalScriptProvider options={paypalOptions}>
      <BrowserRouter>
        <CartProvider>
          <App />
        </CartProvider>
      </BrowserRouter>
    </PayPalScriptProvider>
  </React.StrictMode>
);
