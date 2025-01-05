'use client';

import React, { Suspense, useEffect, useState } from 'react';
import VideoModal from './VideoModal';
import { IProject } from '@/lib/database/models/project.model';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { NavigationSection } from './NavigationSection';

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
    <div className="flex flex-col">
      <div
        className="relative overflow-hidden  shadow-xl cursor-pointer group"
        onClick={onClick}
      >
        <Suspense fallback={<ProjectSkeleton />}>
          <Image
            src={project.images[0]}
            width={400}
            height={400}
            alt={project.title}
            className={`object-cover w-full aspect-video transition-all duration-500 group-hover:scale-105 group-hover:blur-sm`}
          />
        </Suspense>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 ">
          <div className="text-center px-2 flex flex-col justify-center items-center  w-full h-full">
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-white">
              {project.title}
            </h3>
            <p className="text-xs sm:text-sm text-gray-300">{project.real}</p>
            <p className="text-xs sm:text-sm text-gray-300">{project.dop}</p>
          </div>
        </div>
      </div>
      {/* <div className="hidden md:block mt-1 px-2 group-hover:translate-x-1 transition-all duration-500">
        <h3 className="text-sm  2xl:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-xs   text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
          {project.real}
        </p>
        <p className="text-xs   text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
          {project.dop}
        </p>
      </div> */}
    </div>
  );
};

const ProjectsGrid = ({ projects, link }: ProjectsGridProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null);

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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-y-10 mx-auto pb-16 mt-8">
        {projects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            onClick={() => openModal(project)}
          />
        ))}
      </div>
      <NavigationSection href={link} />
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

export default ProjectsGrid;
