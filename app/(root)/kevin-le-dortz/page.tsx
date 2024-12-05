import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getKevinProjects } from '@/lib/actions/project.actions';
import React from 'react';

const page = async () => {
  const projects = await getKevinProjects();

  return <ProjectsGrid projects={projects} />;
};

export default page;
