import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function TossFailPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const message = searchParams.get('message') || '결제가 취소되었거나 실패했습니다.';

  return (
    <div className="flex-grow w-full px-page-margin py-section-gap flex flex-col items-center justify-center gap-4">
      <p className="font-body text-body">{message}</p>
      <button type="button" onClick={() => navigate('/checkout')} className="btn-primary">
        다시 시도하기
      </button>
    </div>
  );
}
