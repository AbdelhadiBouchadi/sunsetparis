import PageHeader from '@/components/shared/PageHeader';
import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getKevinProjects } from '@/lib/actions/project.actions';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getKevinProjects();

  return (
    <>
      <PageHeader artistName="Kevin Le Dortz" />
      <ProjectsGrid projects={projects} />
    </>
  );
};

export default page;
