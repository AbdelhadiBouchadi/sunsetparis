'use client';

import { projects } from '@/constants';
import Image from 'next/image';
import React, { useState } from 'react';
import Modal from './Modal';

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
            className="w-full flex justify-center items-center cursor-pointer relative group overflow-hidden"
            key={index}
            onClick={() => openModal(project)}
          >
            <div className="absolute bottom-2 left-4 flex flex-col items-center justify-center gap-2 z-10 text-white transition-all duration-500 group-hover:translate-x-1">
              <span className="w-full text-sm font-bold uppercase text-start">
                {' '}
                {project.title}{' '}
              </span>
              <span className="w-full text-sm font-light uppercase text-start">
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
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
          <div className="h-0 w-full pb-[100%] sm:pb-[80%] md:pb-[60%] ">
            <div className="absolute top-0 left-0 w-full h-full flex flex-col">
              <div className="w-full h-full relative">
                <iframe
                  src={selectedImage.videoSource}
                  width="100%"
                  height="100%"
                  frameBorder={0}
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default ProjectsExample;
