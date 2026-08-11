import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export default function OrderConfirmation() {
  const { t } = useLanguage();
  return (
    <div className="flex-grow w-full px-page-margin py-section-gap flex flex-col items-center justify-center min-h-[70vh]">
      <div className="max-w-2xl w-full text-center flex flex-col items-center border border-primary p-section-gap bg-surface-bright">
        
        <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center mb-8 bg-background">
          <span className="material-symbols-outlined text-3xl" style={{fontVariationSettings: "'FILL' 0"}}>check</span>
        </div>

        <h1 className="font-page-title text-[24px] uppercase tracking-widest mb-2">{t('orderConfirmation.title')}</h1>

        <p className="font-body text-body text-secondary mb-8">
          {t('orderConfirmation.message')}
        </p>

        <div className="w-full border-t border-b border-border-subtle py-6 mb-8 flex flex-col gap-4 text-left">
          <div className="flex justify-between">
            <span className="font-body-bold text-body">{t('orderConfirmation.orderNumber')}</span>
            <span className="font-body text-body">#RKA-4892</span>
          </div>
          <div className="flex justify-between">
            <span className="font-body-bold text-body">{t('orderConfirmation.date')}</span>
            <span className="font-body text-body">{new Date().toLocaleDateString()}</span>
          </div>
        </div>

        <Link to="/" className="btn-primary max-w-sm mx-auto uppercase">
          {t('orderConfirmation.returnHome')}
        </Link>
      </div>
    </div>
  );
}
