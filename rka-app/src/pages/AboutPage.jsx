import React from 'react';
import { about } from '../data/data';

export default function AboutPage() {
  return (
    <div className="flex-grow px-page-margin py-section-gap flex flex-col gap-section-gap max-w-3xl">
      <header>
        <h1 className="font-page-title text-page-title">About</h1>
      </header>
      
      <section className="flex flex-col gap-gutter font-body text-body">
        {about.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </section>

      <section className="flex flex-col gap-section-gap mt-section-gap">
        <div className="flex flex-col gap-stack-gap">
          <h2 className="font-section-header text-section-header">Team</h2>
          <p className="font-body text-body">{about.team}</p>
        </div>
        
        <div className="flex flex-col gap-stack-gap">
          <h2 className="font-section-header text-section-header">Contact</h2>
          <p className="font-body text-body">
            {about.contact.email}<br />
            {about.contact.phone}
          </p>
        </div>
        
        <div className="flex flex-col gap-stack-gap">
          <h2 className="font-section-header text-section-header">Address</h2>
          <p className="font-body text-body">
            {about.address.map((line, i) => (
              <React.Fragment key={i}>{line}<br/></React.Fragment>
            ))}
          </p>
        </div>
        
        <div className="flex flex-col gap-stack-gap">
          <h2 className="font-section-header text-section-header">Instagram</h2>
          <a href={about.instagramUrl} target="_blank" rel="noopener noreferrer" className="font-body text-body hover:text-secondary underline decoration-1 underline-offset-2">
            {about.instagram}
          </a>
        </div>
      </section>
    </div>
  );
}
