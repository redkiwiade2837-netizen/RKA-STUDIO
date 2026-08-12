import React from 'react';
import { Link } from 'react-router-dom';
import { about } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="flex justify-between items-center w-full px-page-margin py-gutter bg-background border-t border-border-subtle mt-auto">
      <div className="flex gap-4">
        <a href={about.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-caption text-caption text-primary hover:text-secondary transition-colors">{t('footer.instagram')}</a>
        <Link to="/contact" className="font-caption text-caption text-primary hover:text-secondary transition-colors">{t('footer.contact')}</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/terms" className="font-caption text-caption text-primary hover:text-secondary transition-colors">{t('footer.terms')}</Link>
        <Link to="/privacy" className="font-caption text-caption text-primary hover:text-secondary transition-colors">{t('footer.privacy')}</Link>
      </div>
    </footer>
  );
}
