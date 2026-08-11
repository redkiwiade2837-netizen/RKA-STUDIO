import React, { useMemo, useState } from 'react';
import ProjectCard from '../components/ProjectCard';
import { projects } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

export default function ProjectsIndex() {
  const { t } = useLanguage();
  const [selectedType, setSelectedType] = useState(null); // null = all types

  // Derived from whatever "(Type)" values are actually in use, rather than
  // a hardcoded list — a new type only needs a folder rename to show up here.
  const types = useMemo(
    () => Array.from(new Set(projects.map((p) => p.type).filter(Boolean))).sort(),
    []
  );

  const visibleProjects = selectedType
    ? projects.filter((p) => p.type === selectedType)
    : projects;

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
              <li>
                <button
                  type="button"
                  onClick={() => setSelectedType(null)}
                  className={`font-body text-body text-primary hover:underline ${!selectedType ? 'font-body-bold underline' : ''}`}
                >
                  All
                </button>
              </li>
              {types.map((type) => (
                <li key={type}>
                  <button
                    type="button"
                    onClick={() => setSelectedType(type)}
                    className={`font-body text-body text-primary hover:underline ${selectedType === type ? 'font-body-bold underline' : ''}`}
                  >
                    {type}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </aside>

      <section className="flex-grow">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-gutter">
          {visibleProjects.map(proj => (
            <ProjectCard key={proj.id} project={proj} />
          ))}
        </div>
      </section>
    </div>
  );
}
