'use client';

import React, { useState } from 'react';
import { IProject } from '@/lib/database/models/project.model';
import FeaturesProjectsGrid from './FeaturesProjectsGrid';
import VideoProjectsGrid from './VideoProjects';
import AllProjectsGrid from './AllProjectsGrid';
import { NavigationSection } from './NavigationSection';

interface ProjectsGridProps {
  projects: IProject[];
  link?: string;
}

const ProjectsGrid = ({ projects, link }: ProjectsGridProps) => {
  const [selectedCategory, setSelectedCategory] = useState<
    'all' | 'videos' | 'features'
  >('all');

  const hasFeatures = projects.some(
    (project) => project.category === 'features'
  );

  if (!hasFeatures) {
    return (
      <>
        <VideoProjectsGrid
          projects={projects.filter((p) => p.category === 'videos')}
        />
        <NavigationSection
          href={link}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          hasFeatures={false}
        />
      </>
    );
  }

  const filteredProjects =
    selectedCategory === 'all'
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <>
      {/* {selectedCategory === 'all' ? (
        <AllProjectsGrid projects={filteredProjects} link={link} />
      ) : selectedCategory === 'features' ? (
        <FeaturesProjectsGrid projects={filteredProjects} link={link} />
      ) : (
        <VideoProjectsGrid projects={filteredProjects} link={link} />
      )} */}
      <AllProjectsGrid projects={filteredProjects} link={link} />
      {/* <NavigationSection
        href={link}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        hasFeatures={true}
      /> */}
    </>
  );
};

export default ProjectsGrid;
