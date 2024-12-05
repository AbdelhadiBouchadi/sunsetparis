import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getRomainProjects } from '@/lib/actions/project.actions';
import React from 'react';

const page = async () => {
  const projects = await getRomainProjects();

  return <ProjectsGrid projects={projects} />;
};

export default page;
