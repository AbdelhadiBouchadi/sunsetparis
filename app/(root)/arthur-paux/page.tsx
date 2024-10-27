import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getArthurProjects } from '@/lib/actions/project.actions';
import React from 'react';

const page = async () => {
  const projects = await getArthurProjects();

  return <ProjectsGrid projects={projects} />;
};

export default page;
