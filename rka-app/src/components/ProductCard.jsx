import React from 'react';
import { Link } from 'react-router-dom';

export default function ProductCard({ item, type }) {
  // type: 'item' or 'furniture'
  return (
    <Link to={`/${type}/${item.id}`} className="flex flex-col group cursor-pointer img-hover-fade">
      <div className="mb-item-gap flex items-baseline">
        <span className="font-project-number text-project-number">{item.number}</span>
        <span className="font-label-caps text-label-caps uppercase mx-1">{item.title}</span>
        {item.location && <span className="font-body text-body">– {item.location}</span>}
      </div>
      <div className="aspect-square bg-surface-container overflow-hidden w-full relative">
        <img 
          src={item.img} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale img-primary" 
        />
        <img 
          src={item.imgHover || item.img} 
          alt={`${item.title} alternative view`} 
          className="w-full h-full object-cover grayscale absolute inset-0 img-secondary" 
        />
      </div>
    </Link>
  );
}
