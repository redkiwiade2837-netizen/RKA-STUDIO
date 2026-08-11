import React from 'react';
import ProductCard from '../components/ProductCard';
import { furniture } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function FurnitureIndex() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row w-full mt-section-gap px-page-margin pb-section-gap">
      <aside className="w-full md:w-48 flex-shrink-0 mb-section-gap md:mb-0 pr-gutter">
        <nav className="flex flex-col gap-section-gap">
          <div className="flex flex-col gap-stack-gap">
            <h2 className="font-section-header text-section-header text-primary mb-2">{t('productIndex.index')}</h2>
            <ul className="flex flex-col gap-1">
              <li><button className="font-body-bold text-body text-primary underline hover:underline">01–25</button></li>
              <li><button className="font-body text-body text-primary hover:underline">26–50</button></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-stack-gap">
            <h2 className="font-section-header text-section-header text-primary mb-2">{t('productIndex.type')}</h2>
            <ul className="flex flex-col gap-1">
              <li><button className="font-body text-body text-primary hover:underline">Seating</button></li>
              <li><button className="font-body text-body text-primary hover:underline">Tables</button></li>
              <li><button className="font-body text-body text-primary hover:underline">Storage</button></li>
            </ul>
          </div>
        </nav>
      </aside>

      <section className="flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {furniture.map(item => (
            <ProductCard key={item.id} item={item} type="furniture" />
          ))}
        </div>
      </section>
    </div>
  );
}
