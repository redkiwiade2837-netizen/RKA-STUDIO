import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Header() {
  const { cartCount } = useCart();
  const location = useLocation();

  const isCheckout = location.pathname === '/checkout' || location.pathname === '/order-confirmation';

  return (
    <header className="flex flex-col gap-stack-gap w-full px-page-margin pt-gutter bg-background transition-all duration-100 ease-linear sticky top-0 z-50">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="font-body-bold text-page-title text-primary">RKA</Link>
        
        <Link to="/cart" className="flex items-center gap-item-gap hover:text-secondary transition-colors duration-150">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>shopping_cart</span>
          {cartCount > 0 && <span className="text-caption font-body-bold">{cartCount}</span>}
        </Link>
      </div>

      {!isCheckout && (
        <nav className="flex gap-section-gap w-full mt-item-gap pb-2">
          <Link to="/projects" className={`font-body text-primary hover:text-secondary transition-colors duration-150 ${location.pathname === '/projects' ? 'font-body-bold border-b border-primary' : ''}`}>Projects</Link>
          <Link to="/furniture" className={`font-body text-primary hover:text-secondary transition-colors duration-150 ${location.pathname.includes('/furniture') ? 'font-body-bold border-b border-primary' : ''}`}>Furniture</Link>
          <Link to="/items" className={`font-body text-primary hover:text-secondary transition-colors duration-150 ${location.pathname.includes('/items') ? 'font-body-bold border-b border-primary' : ''}`}>Items</Link>
          <Link to="/about" className={`font-body text-primary hover:text-secondary transition-colors duration-150 ${location.pathname === '/about' ? 'font-body-bold border-b border-primary' : ''}`}>About</Link>
        </nav>
      )}
    </header>
  );
}
