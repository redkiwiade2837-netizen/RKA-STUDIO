import React, { useEffect, useRef, useState } from 'react';
import { API_BASE_URL } from '../config';

const TOSS_CLIENT_KEY = import.meta.env.VITE_TOSS_CLIENT_KEY;

function getCustomerKey() {
  const stored = localStorage.getItem('tossCustomerKey');
  if (stored) return stored;
  const generated = `customer-${crypto.randomUUID()}`;
  localStorage.setItem('tossCustomerKey', generated);
  return generated;
}

// Toss's V2 Payment Widget: the backend prices the cart and hands back an
// orderId/amount (never trust a client-computed amount), the widget renders
// itself into the two divs below, and requestPayment() redirects the whole
// page to Toss's hosted payment flow, which redirects back to /toss/success
// or /toss/fail.
export default function TossCheckout({ cartItems, onError }) {
  const orderRef = useRef(null);
  const widgetsRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [amount, setAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        const response = await fetch(`${API_BASE_URL}/api/toss/orders`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            items: cartItems.map(({ id, quantity }) => ({ id, quantity })),
          }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || '주문 생성에 실패했습니다.');
        if (cancelled) return;

        const tossPayments = window.TossPayments(TOSS_CLIENT_KEY);
        const widgets = tossPayments.widgets({ customerKey: getCustomerKey() });

        await widgets.setAmount({ value: data.amount, currency: 'KRW' });
        await widgets.renderPaymentMethods('#toss-payment-methods');
        await widgets.renderAgreement('#toss-agreement');
        if (cancelled) return;

        orderRef.current = { orderId: data.orderId, orderName: data.orderName };
        widgetsRef.current = widgets;
        setAmount(data.amount);
        setReady(true);
      } catch (err) {
        console.error('Toss init error:', err);
        setError(err.message);
        if (onError) onError(err);
      }
    }

    init();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePay = async () => {
    if (!widgetsRef.current || !orderRef.current) return;
    try {
      await widgetsRef.current.requestPayment({
        orderId: orderRef.current.orderId,
        orderName: orderRef.current.orderName,
        successUrl: `${window.location.origin}/toss/success`,
        failUrl: `${window.location.origin}/toss/fail`,
      });
    } catch (err) {
      console.error('Toss requestPayment error:', err);
      if (onError) onError(err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto mt-4">
      {error && <p className="font-caption text-caption text-error mb-2">{error}</p>}
      <div id="toss-payment-methods" />
      <div id="toss-agreement" />
      {ready && (
        <button type="button" onClick={handlePay} className="btn-primary mt-4 w-full">
          {amount != null ? `₩${amount.toLocaleString()} 결제하기` : '결제하기'}
        </button>
      )}
    </div>
  );
}
