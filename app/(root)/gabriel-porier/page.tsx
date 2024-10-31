import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getGabrielProjects } from '@/lib/actions/project.actions';
import React from 'react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const page = async () => {
  const projects = await getGabrielProjects();

  return <ProjectsGrid projects={projects} />;
};

export default page;
