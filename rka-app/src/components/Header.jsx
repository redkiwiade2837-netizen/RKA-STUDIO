import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_ITEMS } from '../nav';
import { useLanguage } from '../context/LanguageContext';

function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <div className="flex items-center gap-2 font-caption text-caption">
      <button
        type="button"
        onClick={() => setLanguage('ko')}
        className={language === 'ko' ? 'font-body-bold text-primary' : 'text-text-muted hover:text-primary transition-colors'}
      >
        KR
      </button>
      <span className="text-text-muted">|</span>
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={language === 'en' ? 'font-body-bold text-primary' : 'text-text-muted hover:text-primary transition-colors'}
      >
        EN
      </button>
    </div>
  );
}

export default function Header() {
  const location = useLocation();
  const { t } = useLanguage();

  const isCheckout = location.pathname === '/checkout' || location.pathname === '/order-confirmation';

  const navLabel = (path) => {
    switch (path) {
      case '/projects': return t('nav.projects');
      case '/furniture': return t('nav.furniture');
      case '/items': return t('nav.items');
      case '/about': return t('nav.about');
      default: return path;
    }
  };

  return (
    <header className="flex flex-col gap-stack-gap w-full px-page-margin pt-gutter bg-background transition-all duration-100 ease-linear sticky top-0 z-50">
      <div className="flex justify-between items-center w-full">
        <Link to="/" className="font-body-bold text-page-title text-primary">RKA</Link>

        <LanguageToggle />
      </div>

      {!isCheckout && (
        <nav className="flex gap-section-gap w-full mt-item-gap pb-2">
          {NAV_ITEMS.map((item) => {
            const isActive = item.exact ? location.pathname === item.path : location.pathname.includes(item.path);
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`font-body text-primary hover:text-secondary transition-colors duration-150 ${isActive ? 'font-body-bold border-b border-primary' : ''}`}
              >
                {navLabel(item.path)}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}