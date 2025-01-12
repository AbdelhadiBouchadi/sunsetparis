'use client';

import { IProject } from '@/lib/database/models/project.model';
import { columns } from './columns';
import { DataTable } from './DataTable';
import { useMemo } from 'react';

interface ProjectsTableProps {
  projects: IProject[];
  selectedArtist: string;
}

export function ProjectsTable({
  projects,
  selectedArtist,
}: ProjectsTableProps) {
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => project.artist === selectedArtist);
  }, [projects, selectedArtist]);

  return <DataTable columns={columns} data={filteredProjects} />;
}
