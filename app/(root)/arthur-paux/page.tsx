import PageHeader from '@/components/shared/PageHeader';
import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getArthurProjects } from '@/lib/actions/project.actions';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getArthurProjects();

  return (
    <>
      <PageHeader artistName="Arthur Paux" />
      <ProjectsGrid projects={projects} link="https://www.arthur-paux.com" />
    </>
  );
};

export default page;
