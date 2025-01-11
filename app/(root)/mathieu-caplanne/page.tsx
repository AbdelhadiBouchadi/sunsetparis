import PageHeader from '@/components/shared/PageHeader';
import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getMathieuProjects } from '@/lib/actions/project.actions';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getMathieuProjects();

  return (
    <>
      <PageHeader artistName="Mathieu Caplanne" />
      <ProjectsGrid projects={projects} link="http://mathieucaplanne.com" />
    </>
  );
};

export default page;
