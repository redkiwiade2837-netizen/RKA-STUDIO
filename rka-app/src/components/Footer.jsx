import React from 'react';
import { Link } from 'react-router-dom';
import { about } from '../data/data';

export default function Footer() {
  return (
    <footer className="flex justify-between items-center w-full px-page-margin py-gutter bg-background border-t border-border-subtle mt-auto">
      <div className="flex gap-4">
        <a href={about.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-caption text-caption text-primary hover:text-secondary transition-colors">Instagram</a>
        <a href="#" className="font-caption text-caption text-primary hover:text-secondary transition-colors">Contact</a>
      </div>
      <div className="flex gap-4">
        <Link to="#" className="font-caption text-caption text-primary hover:text-secondary transition-colors">Terms</Link>
        <Link to="#" className="font-caption text-caption text-primary hover:text-secondary transition-colors">Privacy</Link>
      </div>
    </footer>
  );
}
