import ProjectsGrid from '@/components/shared/ProjectsGrid';
import { getArthurProjects } from '@/lib/actions/project.actions';
import { ensureDatabaseConnection } from '@/lib/database';
import React from 'react';

const page = async () => {
  await ensureDatabaseConnection();
  const projects = await getArthurProjects();

  return <ProjectsGrid projects={projects} />;
};

export default page;
