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
    <div className="group flex flex-col" onClick={onClick}>
      <div className="relative overflow-hidden  shadow-xl cursor-pointer group">
        <Suspense fallback={<ProjectSkeleton />}>
          <Image
            src={project.images[0]}
            width={400}
            height={400}
            alt={project.title}
            className={`object-cover w-full aspect-video transition-transform duration-500 group-hover:scale-105`}
            loading="lazy"
          />
        </Suspense>
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <div className="mt-1 px-2 group-hover:translate-x-1 transition-all duration-500">
        <h3 className="text-sm  2xl:text-xl font-bold text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-xs   text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
          {project.real}
        </p>
        <p className="text-xs   text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200 transition-colors duration-300">
          {project.dop}
        </p>
      </div>
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
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-10 mx-auto pb-16">
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
