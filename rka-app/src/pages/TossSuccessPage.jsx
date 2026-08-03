import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { API_BASE_URL } from '../config';

export default function TossSuccessPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const paymentKey = searchParams.get('paymentKey');
    const orderId = searchParams.get('orderId');

    if (!paymentKey || !orderId) {
      setError('결제 정보를 확인할 수 없습니다.');
      return;
    }

    // amount is echoed back by the browser redirect, not proof of payment —
    // the backend looks up its own stored amount for this orderId and
    // confirms with Toss's server API using that value.
    fetch(`${API_BASE_URL}/api/toss/confirm`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ paymentKey, orderId }),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) throw new Error(data.message || '결제 승인에 실패했습니다.');
        navigate('/order-confirmation');
      })
      .catch((err) => setError(err.message));
  }, [searchParams, navigate]);

  return (
    <div className="flex-grow w-full px-page-margin py-section-gap flex items-center justify-center">
      <p className="font-body text-body">{error || '결제를 확인하고 있습니다...'}</p>
    </div>
  );
}
