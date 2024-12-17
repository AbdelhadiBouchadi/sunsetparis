import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getNicolasProjects } from '@/lib/actions/project.actions';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getNicolasProjects();

  return (
    <>
      <div className="sticky top-0 z-40 py-5 md:py-8 h-full w-full flex justify-center items-center">
        <h1 className=" text-2xl lg:text-4xl font-light text-center uppercase text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] tracking-tighter">
          Nicolas Gautier
        </h1>
      </div>
      <ProjectsGrid
        projects={projects}
        link="https://www.nicolasgautiercolorist.com"
      />
    </>
  );
};

export default page;
