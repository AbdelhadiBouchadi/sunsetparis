'use client';

import React, { useEffect, useState } from 'react';
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
    <div
      className="w-full flex justify-center items-center cursor-pointer relative group overflow-hidden shadow-xl"
      key={project._id}
      onClick={onClick}
    >
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-2 left-4 2xl:bottom-6 2xl:left-12 flex flex-col items-center justify-center gap-2 z-10  transition-all duration-500 group-hover:translate-x-1">
        <span className="w-full text-sm text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] xl:text-lg 2xl:text-2xl font-bold uppercase text-start">
          {project.title}
        </span>
        <span className="w-full text-sm text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] xl:text-lg 2xl:text-2xl font-light uppercase text-start">
          {project.description}
        </span>
      </div>
      {!imageLoaded && <ProjectSkeleton />}
      <Image
        src={project.imageUrl}
        width={400}
        height={200}
        alt="project_image_sunset_paris"
        className={`object-cover w-full h-full transition-all duration-500 group-hover:scale-105 ease-in-out ${
          imageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        loading="lazy"
        onLoad={() => setImageLoaded(true)}
      />
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 mx-auto pb-4">
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
          videoId={selectedProject.videoSource}
          title={selectedProject.title}
          subtitle={selectedProject.description}
        />
      )}
    </>
  );
};

export default ProjectsGrid;
