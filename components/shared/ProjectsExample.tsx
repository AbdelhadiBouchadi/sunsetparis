'use client';

import { projects } from '@/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import VideoModal from './VideoModal';

interface ProjectData {
  title: string;
  description: string;
  artist: string;
  imageUrl: string;
  videoSource: string;
}

const ProjectsExample = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ProjectData | null>(null);

  function openModal(project: ProjectData) {
    setSelectedImage(project);
    setIsOpen(true);
  }

  function closeModal() {
    setSelectedImage(null);
    setIsOpen(false);
  }

  return (
    <>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 xl:gap-8 mx-auto pb-4">
        {projects.map((project, index) => (
          <div
            className="w-full flex justify-center items-center cursor-pointer relative group overflow-hidden shadow-xl"
            key={index}
            onClick={() => openModal(project)}
          >
            <div className="absolute bottom-2 left-4 2xl:bottom-6 2xl:left-12 flex flex-col items-center justify-center gap-2 z-10 text-white transition-all duration-500 group-hover:translate-x-1">
              <span className="w-full text-sm xl:text-lg 2xl:text-2xl font-bold uppercase text-start">
                {' '}
                {project.title}{' '}
              </span>
              <span className="w-full text-sm xl:text-lg 2xl:text-2xl font-light uppercase text-start">
                {' '}
                {project.description}{' '}
              </span>
            </div>
            <Image
              src={project.imageUrl}
              width={400}
              height={200}
              alt="project_image_sunset_paris"
              className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 ease-in-out"
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <VideoModal
          isOpen={isOpen}
          onClose={closeModal}
          videoId={selectedImage.videoSource}
          title={selectedImage.title}
          subtitle={selectedImage.description}
        />
      )}
    </>
  );
};

export default ProjectsExample;
