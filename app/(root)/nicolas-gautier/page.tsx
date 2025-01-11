import PageHeader from '@/components/shared/PageHeader';
import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getNicolasProjects } from '@/lib/actions/project.actions';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getNicolasProjects();

  return (
    <>
      <PageHeader artistName="Nicolas Gautier" />
      <ProjectsGrid
        projects={projects}
        link="https://www.nicolasgautiercolorist.com"
      />
    </>
  );
};

export default page;
