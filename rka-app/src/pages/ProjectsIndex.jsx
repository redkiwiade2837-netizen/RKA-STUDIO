import React from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsIndex() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row w-full mt-section-gap px-page-margin pb-section-gap">
      <aside className="w-full md:w-48 flex-shrink-0 mb-section-gap md:mb-0 pr-gutter">
        <nav className="flex flex-col gap-section-gap">
          <div className="flex flex-col gap-stack-gap">
            <h2 className="font-section-header text-section-header text-primary mb-2">{t('productIndex.index')}</h2>
            <ul className="flex flex-col gap-1">
              <li><button className="font-body-bold text-body text-primary underline hover:underline">All Years</button></li>
              <li><button className="font-body text-body text-primary hover:underline">2024</button></li>
              <li><button className="font-body text-body text-primary hover:underline">2023</button></li>
              <li><button className="font-body text-body text-primary hover:underline">2022</button></li>
            </ul>
          </div>
          
          <div className="flex flex-col gap-stack-gap">
            <h2 className="font-section-header text-section-header text-primary mb-2">{t('productIndex.type')}</h2>
            <ul className="flex flex-col gap-1">
              <li><button className="font-body text-body text-primary hover:underline">Public</button></li>
              <li><button className="font-body text-body text-primary hover:underline">Cultural</button></li>
              <li><button className="font-body text-body text-primary hover:underline">Housing</button></li>
            </ul>
          </div>
        </nav>
      </aside>

      <section className="flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {projects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>
    </div>
  );
}
