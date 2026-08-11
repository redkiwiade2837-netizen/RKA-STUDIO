import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="flex-grow w-full px-page-margin py-section-gap flex flex-col md:flex-row gap-section-gap max-w-[1200px] mx-auto">

      {/* Cart Items List */}
      <div className="flex-grow flex flex-col gap-item-gap w-full md:w-2/3">
        <h1 className="font-page-title text-page-title mb-item-gap uppercase tracking-tight">{t('cart.title')}</h1>

        {cartItems.length === 0 ? (
          <p className="font-body text-body mt-4">{t('cart.empty')}</p>
        ) : (
          cartItems.map(item => (
            <div key={item.id} className="flex items-center justify-between border-b border-primary pb-item-gap group mt-item-gap">
              <div className="flex items-center gap-gutter flex-1">
                <div className="w-24 h-24 bg-surface-container flex-shrink-0 relative overflow-hidden">
                  <img src={item.img} alt={item.title} className="object-cover w-full h-full grayscale mix-blend-multiply" />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-caps text-label-caps uppercase">{item.title}</span>
                  <span className="font-caption text-caption text-secondary mt-stack-gap">{t('cart.ref')}: {item.ref}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-gutter justify-end">
                <div className="flex items-center border border-primary h-8 w-24 flex-shrink-0">
                  <button onClick={() => updateQuantity(item.id, -1)} className="flex-1 h-full flex items-center justify-center hover:text-secondary transition-colors">-</button>
                  <span className="font-body text-body w-8 text-center border-x border-primary h-full flex items-center justify-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, 1)} className="flex-1 h-full flex items-center justify-center hover:text-secondary transition-colors">+</button>
                </div>
                <div className="w-16 flex justify-end">
                  <span className="font-body-bold text-body-bold">${item.price * item.quantity}</span>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-secondary hover:text-primary transition-colors ml-stack-gap">
                  <span className="material-symbols-outlined text-[16px]" style={{fontVariationSettings: "'FILL' 0"}}>close</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Column */}
      <div className="w-full md:w-1/3 flex flex-col pt-0 md:pt-[3.2rem]">
        <div className="bg-surface-bright border border-primary p-gutter flex flex-col gap-item-gap">
          <h2 className="font-section-header text-section-header uppercase border-b border-primary pb-stack-gap mb-stack-gap">{t('cart.summary')}</h2>

          <div className="flex justify-between font-body text-body">
            <span>{t('cart.subtotal')}</span>
            <span>${cartTotal}</span>
          </div>
          <div className="flex justify-between font-body text-body">
            <span>{t('cart.shipping')}</span>
            <span>{t('cart.shippingCalculated')}</span>
          </div>

          <div className="flex justify-between font-body-bold text-body-bold border-t border-primary pt-stack-gap mt-stack-gap">
            <span>{t('cart.total')}</span>
            <span>${cartTotal}</span>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            disabled={cartItems.length === 0}
            className={`btn-primary mt-item-gap ${cartItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {t('cart.proceedToCheckout')}
          </button>
        </div>
      </div>

    </div>
  );
}
