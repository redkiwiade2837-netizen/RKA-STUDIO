import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { projects } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

// Data Arrays from original design
const photos = [
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600607687931-ceeb66d11262?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1600566753086-00f18efc2291?auto=format&fit=crop&q=80"
];

const drawings = [
  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1541888086925-0c1157b85e05?auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&q=80"
];

export default function GalleryDetail() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [drawingIndex, setDrawingIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const { t } = useLanguage();

  // Try to find project, fallback to default title
  const project = projects.find(p => p.id === id);
  const title = project ? project.title : 'PROJECT TITLE';
  const number = project ? `OFFICE ${project.number}` : 'OFFICE 417';

  const cyclePhoto = () => {
    setPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const cycleDrawing = () => {
    setDrawingIndex((prev) => (prev + 1) % drawings.length);
  };

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col font-body text-body bg-background text-primary fixed inset-0 z-[100]">
      
      {/* Top Bar */}
      <header className="flex justify-between items-center px-page-margin py-gutter w-full shrink-0 relative z-50">
        <div className="font-body-bold text-body uppercase">RKA — {title}</div>
        <div className="font-body text-body absolute left-1/2 -translate-x-1/2 uppercase">{number}</div>
        <button className="font-body text-body hover:opacity-50 transition-opacity" onClick={() => navigate(-1)}>
          ✕
        </button>
      </header>

      {/* Main Content Split View */}
      <main className="flex-grow flex flex-row overflow-hidden w-full px-page-margin gap-gutter items-center justify-center relative z-40">
        {/* Left Side: Photo */}
        <div className="w-1/2 h-full flex items-center justify-center cursor-pointer group" onClick={cyclePhoto}>
          <img 
            id="photo-img"
            src={photos[photoIndex]} 
            alt="Architectural Photo" 
            className="max-h-full max-w-full object-contain transition-opacity duration-300 ease-in-out group-hover:opacity-90"
          />
        </div>

        {/* Right Side: Drawing/Plan */}
        <div className="w-1/2 h-full flex items-center justify-center cursor-pointer group" onClick={cycleDrawing}>
          <img 
            id="drawing-img"
            src={drawings[drawingIndex]} 
            alt="Architectural Drawing" 
            className="max-h-full max-w-full object-contain grayscale opacity-80 transition-opacity duration-300 ease-in-out group-hover:opacity-70"
          />
        </div>
      </main>

      {/* Bottom Bar */}
      <footer className="w-full flex justify-between items-center px-page-margin py-gutter fixed bottom-0 left-0 bg-background z-50">
        <div className="font-body text-body text-text-muted">
          <span>{photoIndex + 1}</span>/{photos.length}
        </div>
        <button className="font-body text-body uppercase tracking-wider absolute left-1/2 -translate-x-1/2 hover:underline underline-offset-4 decoration-1 cursor-pointer transition-all">
          {t('productDetail.info')}
        </button>
        <div className="font-body text-body text-text-muted">
          <span>{drawingIndex + 1}</span>/{drawings.length}
        </div>
      </footer>
      
    </div>
  );
}
