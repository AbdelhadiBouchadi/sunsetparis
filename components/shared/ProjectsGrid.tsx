'use client';

import React, { useState } from 'react';
import VideoModal from './VideoModal';
import { IProject } from '@/lib/database/models/project.model';
import Image from 'next/image';

interface ProjectsGridProps {
  projects: IProject[];
}

const ProjectSkeleton = () => (
  <div className="w-full h-[300px] 2xl:h-[400px] bg-gray-200 dark:bg-gray-700 animate-pulse overflow-hidden">
    <div className="w-full h-full flex flex-col justify-end p-4 2xl:p-12">
      <div className="w-3/4 h-6 bg-gray-300 dark:bg-gray-600 mb-2"></div>
      <div className="w-1/2 h-4 bg-gray-300 dark:bg-gray-600"></div>
    </div>
  </div>
);

const ProjectCard = ({
  project,
  onClick,
}: {
  project: IProject;
  onClick: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="group flex flex-col" onClick={onClick}>
      <div className="relative overflow-hidden  shadow-xl cursor-pointer group">
        {!imageLoaded && <ProjectSkeleton />}
        <Image
          src={project.images[0]}
          width={400}
          height={400}
          alt={project.title}
          className={`object-cover w-full h-[300px] 2xl:h-[400px] transition-transform duration-500 group-hover:scale-105`}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="mt-4 space-y-2 px-2 group-hover:translate-x-1 transition-all duration-500">
        <h3 className="text-lg xl:text-xl 2xl:text-2xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm xl:text-base 2xl:text-lg text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
          {project.real}
        </p>
        <p className="text-sm xl:text-base 2xl:text-lg text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
          {project.dop}
        </p>
      </div>
    </div>
  );
};

const ProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  function openModal(project: IProject) {
    setSelectedProject(project);
    setIsOpen(true);
  }

  function closeModal() {
    setSelectedProject(null);
    setIsOpen(false);
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 mx-auto pb-16">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}
      </div>
      {selectedProject && (
        <VideoModal
          isOpen={isOpen}
          onClose={closeModal}
          videoSource={selectedProject.videoSource}
          title={selectedProject.title}
          real={selectedProject.real}
          dop={selectedProject.dop}
        />
      )}
    </>
  );
};

export default ProjectsGrid;
