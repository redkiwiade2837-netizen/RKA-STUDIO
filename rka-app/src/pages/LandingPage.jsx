import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [hoverInfo, setHoverInfo] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const t1 = setTimeout(() => setShowSubtitle(true), 3000);
    const t2 = setTimeout(() => setShowIntro(false), 6000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleSkip = (e) => {
    e.stopPropagation();
    setShowIntro(false);
  };

  return (
    <div className="relative w-full flex-grow flex items-center justify-center overflow-hidden">
      
      {/* Intro Overlay */}
      {showIntro && (
        <div 
          className="fixed inset-0 z-[100] flex flex-col justify-center items-center bg-surface cursor-pointer transition-opacity duration-1000"
          onClick={handleSkip}
        >
          <h1 className="font-page-title text-[32px] md:text-[64px] mb-4 text-center uppercase tracking-widest">RKA</h1>
          <p className={`font-body text-lg md:text-xl text-center tracking-widest uppercase transition-opacity duration-1000 ${showSubtitle ? 'opacity-100' : 'opacity-0'}`}>
            Artistic pride in different lives
          </p>
          <button 
            className="absolute bottom-8 right-8 font-body-bold text-caption tracking-widest hover:text-text-muted transition-colors uppercase"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
      )}

      {/* Main Landing Canvas */}
      <div className={`transition-opacity duration-1000 w-full h-full flex flex-col items-center justify-center relative pt-24 pb-8 px-page-margin ${showIntro ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
        <div className="relative max-w-5xl w-full h-full flex items-center justify-center">
          <img 
            src="https://lh3.googleusercontent.com/aida/AP1WRLvb04EWEsU_cku4R7Hj-XyEf-8CPXtiKgd3QMuSAcQ_c-rfg59lkGJH8F0_rRf3Or5ThT7S-jGJ9MVPj-lFVzP9kyVMJb5bDdVTqT8wb3Dh1f661yDkxpZBxywZ5oAciegZNR3y04Es7cvaOMEQtXkOEPebbg9rKCIXWpEkUCxJBjcH19VlqVkCG7ntdf0kn2q3X8F8qCpT07pEdEdJrPdxax0xmfxA9zmEka5Q2xOI-17VscFDN0QA6M0" 
            alt="Architectural Bookshelf" 
            className="max-h-[80vh] max-w-full object-contain shadow-sm border border-border-subtle"
          />
          
          {/* Hotspots */}
          <div 
            className="absolute w-3 h-3 bg-primary rounded-full cursor-pointer hover:scale-150 transition-transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: '30%', left: '70%' }}
            onMouseEnter={() => setHoverInfo('MODEL 01 - BRUTALIST STRUCTURE')}
            onMouseLeave={() => setHoverInfo('')}
            onClick={() => navigate('/projects')}
          />
          <div 
            className="absolute w-3 h-3 bg-primary rounded-full cursor-pointer hover:scale-150 transition-transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: '55%', left: '50%' }}
            onMouseEnter={() => setHoverInfo('MONOGRAPH: KOREAN ARCHITECTURE')}
            onMouseLeave={() => setHoverInfo('')}
            onClick={() => navigate('/items')}
          />
          <div 
            className="absolute w-3 h-3 bg-primary rounded-full cursor-pointer hover:scale-150 transition-transform -translate-x-1/2 -translate-y-1/2"
            style={{ top: '80%', left: '30%' }}
            onMouseEnter={() => setHoverInfo('MODEL 02 - CONCRETE BLOCK')}
            onMouseLeave={() => setHoverInfo('')}
            onClick={() => navigate('/projects')}
          />
        </div>
      </div>

      {/* Info Overlay */}
      <div 
        className={`absolute bottom-12 left-page-margin z-40 transition-opacity duration-300 pointer-events-none max-w-md bg-background/95 p-4 border border-border-subtle ${hoverInfo ? 'opacity-100' : 'opacity-0'}`}
      >
        <h2 className="font-section-header text-section-header uppercase mb-2">{hoverInfo}</h2>
        <p className="font-body text-body text-on-surface-variant">
          Selected architectural study. Highlighting the intersection of raw materiality and geometric precision.
        </p>
      </div>
    </div>
  );
}
