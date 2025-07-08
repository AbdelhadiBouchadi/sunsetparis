'use client';

import { User } from '@/types';
import { columns } from './columns';
import { DataTable } from './DataTable';

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  return <DataTable columns={columns} data={users} />;
}
