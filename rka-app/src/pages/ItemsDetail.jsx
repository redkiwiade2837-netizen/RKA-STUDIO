import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { items, furniture } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function ItemsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [showInfo, setShowInfo] = useState(false);
  const [imgOpacity, setImgOpacity] = useState(1);
  
  const isFurniture = window.location.pathname.includes('/furniture');
  const collection = isFurniture ? furniture : items;
  const item = collection.find(i => i.id === id);

  if (!item) return <div className="p-page-margin">Item not found</div>;

  const handleImgClick = () => {
    setImgOpacity(0.5);
    setTimeout(() => setImgOpacity(1), 150);
  };

  const handleAddToCart = () => {
    addToCart(item);
    // show some feedback if needed
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-body text-body bg-background text-primary fixed inset-0 z-[100]">
      {/* Top Bar */}
      <header className="flex justify-between items-center px-page-margin py-gutter w-full shrink-0 relative z-50 bg-background/80 backdrop-blur-sm">
        <div className="w-1/3 text-left">
          <span className="font-body-bold text-body uppercase">RKA — {isFurniture ? 'FURNITURE' : 'ITEM'}</span>
        </div>
        <div className="w-1/3 text-center">
          <span className="font-body text-body uppercase">{item.title}</span>
        </div>
        <div className="w-1/3 text-right">
          <button className="hover:opacity-50 transition-opacity p-2 -mr-2" onClick={() => navigate(-1)}>
            <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 0"}}>close</span>
          </button>
        </div>
      </header>

      {/* Main Content Split View */}
      <main className="flex-grow flex flex-col md:flex-row overflow-hidden w-full h-full pt-[60px] pb-[60px] relative z-40">
        
        {/* Left Image Area */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2 md:p-4 cursor-e-resize relative group overflow-hidden" onClick={handleImgClick}>
          <div className="w-full h-full relative transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
            <img 
              src={item.img} 
              alt={`${item.title} - Front View`} 
              className="w-full h-full object-contain absolute inset-0 transition-opacity duration-150"
              style={{ opacity: imgOpacity }}
            />
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 h-1/2 md:h-full p-2 md:p-4 cursor-w-resize relative group overflow-hidden bg-surface-bright" onClick={handleImgClick}>
          <div className="w-full h-full relative transition-transform duration-500 ease-in-out group-hover:scale-[1.02]">
            <img 
              src={item.imgHover || item.img} 
              alt={`${item.title} - Detail View`} 
              className="w-full h-full object-contain absolute inset-0 grayscale transition-opacity duration-150"
              style={{ opacity: imgOpacity }}
            />
          </div>
        </div>

        {/* Info Overlay Panel */}
        <div className={`absolute inset-x-0 bottom-[60px] bg-background border-t border-primary p-page-margin transition-transform duration-500 ease-in-out z-40 ${showInfo ? 'translate-y-0' : 'translate-y-full'}`}>
          <div className="max-w-2xl mx-auto flex flex-col gap-4">
            <div className="flex justify-between items-end border-b border-primary pb-2">
              <h2 className="font-page-title text-page-title">{item.title}</h2>
              <span className="font-body-bold text-page-title">${item.price}</span>
            </div>
            <p className="font-body text-body">{item.description}</p>
            <div className="flex flex-col gap-1 mt-4">
              {item.details ? item.details.map((detail, idx) => (
                <div key={idx} className="flex justify-between font-body text-body">
                  <span className="text-secondary">{detail.label}</span>
                  <span>{detail.value}</span>
                </div>
              )) : (
                <>
                  <div className="flex justify-between font-body text-body">
                    <span className="text-secondary">{t('productDetail.dimensions')}</span>
                    <span>{item.dimensions}</span>
                  </div>
                  <div className="flex justify-between font-body text-body">
                    <span className="text-secondary">{t('productDetail.material')}</span>
                    <span>{item.material}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

      </main>

      {/* Bottom Bar */}
      <footer className="w-full px-page-margin py-gutter flex justify-between items-center fixed bottom-0 z-50 bg-background/90 backdrop-blur-md">
        <div className="w-1/3 text-left">
          <div className="font-body text-body text-text-muted">1/2</div>
        </div>
        <div className="w-1/3 text-center">
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="font-body text-body uppercase tracking-wider absolute left-1/2 -translate-x-1/2 hover:underline underline-offset-4 decoration-1 cursor-pointer transition-all"
          >
            {showInfo ? t('productDetail.closeInfo') : t('productDetail.info')}
          </button>
        </div>
        <div className="w-1/3 text-right flex justify-end items-center gap-4">
          <button 
            onClick={(e) => {
              handleAddToCart();
              const btn = e.target;
              btn.innerText = t('productDetail.added');
              btn.classList.add('text-secondary');
              setTimeout(() => {
                btn.innerText = t('productDetail.addToCart');
                btn.classList.remove('text-secondary');
              }, 1500);
            }}
            className="font-body text-body uppercase tracking-wider hover:underline underline-offset-4 decoration-1 cursor-pointer transition-all"
          >
            {t('productDetail.addToCart')}
          </button>
        </div>
      </footer>

    </div>
  );
}
