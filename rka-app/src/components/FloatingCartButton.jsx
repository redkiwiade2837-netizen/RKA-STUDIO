import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const HIDDEN_ON = ['/checkout', '/order-confirmation'];

export default function FloatingCartButton() {
  const { cartCount } = useCart();
  const location = useLocation();

  if (HIDDEN_ON.includes(location.pathname) || cartCount === 0) return null;

  return (
    <Link
      to="/cart"
      aria-label="shopping_cart"
      className="fixed bottom-16 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-primary text-on-primary shadow-lg hover:bg-secondary transition-colors"
    >
      <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>shopping_cart</span>
      {cartCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-body-bold rounded-full min-w-[18px] h-[18px] px-1 flex items-center justify-center border border-background">
          {cartCount}
        </span>
      )}
    </Link>
  );
}