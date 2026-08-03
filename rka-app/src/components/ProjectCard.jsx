import React from 'react';
import { Link } from 'react-router-dom';

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="flex flex-col group cursor-pointer img-hover-fade">
      <div className="mb-item-gap flex flex-wrap gap-1 items-baseline w-full truncate">
        <span className="font-project-number text-project-number">{project.number}</span>
        <span className="font-label-caps text-label-caps uppercase mx-1">{project.title}</span>
        {project.location && <span className="font-body text-body">– {project.location}</span>}
      </div>
      <div className="aspect-square bg-surface-container relative overflow-hidden">
        <img 
          src={project.img} 
          alt={project.title} 
          className="absolute inset-0 w-full h-full object-cover grayscale img-primary" 
        />
        <img 
          src={project.imgHover || project.img} 
          alt={`${project.title} alternative view`} 
          className="absolute inset-0 w-full h-full object-cover img-secondary" 
        />
      </div>
    </Link>
  );
}
