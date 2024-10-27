import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getGabrielProjects } from '@/lib/actions/project.actions';
import React from 'react';

const page = async () => {
  const projects = await getGabrielProjects();

  return <ProjectsGrid projects={projects} />;
};

export default page;
