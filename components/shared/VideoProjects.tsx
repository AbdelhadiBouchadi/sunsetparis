'use client';

import React, { Suspense, useEffect, useState } from 'react';
import VideoModal from './VideoModal';
import { IProject } from '@/lib/database/models/project.model';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
  projects: IProject[];
  link?: string;
}

const ProjectSkeleton = () => (
  <div className="w-full aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse overflow-hidden">
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
  return (
    <div
      className="relative overflow-hidden cursor-pointer group"
      onClick={onClick}
      style={{ margin: '-1px', padding: 0 }}
    >
      <Suspense fallback={<ProjectSkeleton />}>
        <Image
          src={project.images[0]}
          width={400}
          height={400}
          alt={project.title}
          className={`object-cover w-full h-full aspect-video transition-all duration-500 group-hover:scale-105 group-hover:blur-sm`}
        />
      </Suspense>
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="text-center px-2 flex flex-col justify-center items-center  w-full h-full text-white">
          <h3
            className={cn(
              'text-sm sm:text-base md:text-lg font-bold',
              project.textColor === 'white' && 'text-white',
              project.textColor === 'black' && 'text-black'
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              'text-xs sm:text-sm',
              project.textColor === 'white' && 'text-gray-200',
              project.textColor === 'black' && 'text-gray-800'
            )}
          >
            {project.real}
          </p>
          <p
            className={cn(
              'text-xs sm:text-sm',
              project.textColor === 'white' && 'text-gray-50',
              project.textColor === 'black' && 'text-gray-900'
            )}
          >
            {project.dop}
          </p>
        </div>
      </div>
    </div>
  );
};

const VideoProjectsGrid = ({ projects }: ProjectsGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

  const videoProjects = projects.filter(
    (project) => project.category === 'videos'
  );

  useEffect(() => {
    const projectTitle = searchParams.get('project');
    if (projectTitle) {
      const project = projects.find(
        (p) => p.title.toLowerCase().replace(/\s+/g, '-') === projectTitle
      );
      if (project) {
        setSelectedProject(project);
        setIsOpen(true);
      }
    }
  }, [searchParams, projects]);

  function openModal(project: IProject) {
    const projectSlug = project.title.toLowerCase().replace(/\s+/g, '-');
    router.push(`?project=${projectSlug}`, { scroll: false });
    setSelectedProject(project);
    setIsOpen(true);
  }

  function closeModal() {
    router.push(pathname, { scroll: false });
    setSelectedProject(null);
    setIsOpen(false);
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-y-8 mx-auto mt-8 overflow-hidden">
        {videoProjects.map((project, index) => (
          <ProjectCard
            key={index}
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
          images={selectedProject.images}
        />
      )}
    </>
  );
};

export default VideoProjectsGrid;
