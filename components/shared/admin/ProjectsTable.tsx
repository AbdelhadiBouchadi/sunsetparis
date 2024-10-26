import { IProject } from '@/lib/database/models/project.model';
import { DataTable } from './DataTable';
import { columns } from './columns';

interface ProjectsTableProps {
  projects: IProject[];
}

export function ProjectsTable({ projects }: ProjectsTableProps) {
  return <DataTable columns={columns} data={projects} />;
}
