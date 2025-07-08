'use client';

import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import { UserPermissionsBadge } from './UserPermissionBadge';
import { formatDistanceToNow } from 'date-fns';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { UserPermissionsDropdown } from './UserPermissionDropdown';
import { DeleteUser } from './DeleteUser';

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: 'photo',
    header: '',
    cell: ({ row }) => {
      const user = row.original;
      const initials =
        `${user.firstName?.[0] || ''}${
          user.lastName?.[0] || ''
        }`.toUpperCase() || user.username[0].toUpperCase();

      return (
        <Avatar className="h-10 w-10">
          <AvatarImage src={user.photo} alt={user.username} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      );
    },
  },
  {
    accessorKey: 'name',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold "
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      const fullName =
        user.firstName && user.lastName
          ? `${user.firstName} ${user.lastName}`
          : user.username;

      return (
        <div className="flex flex-col">
          <span className="font-medium">{fullName}</span>
          <span className="text-14-medium text-muted-foreground">
            @{user.username}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold "
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <span className="text-14-medium">{row.getValue('email')}</span>;
    },
  },
  {
    accessorKey: 'permissions',
    header: 'Permission Level',
    cell: ({ row }) => {
      const user = row.original;
      return <UserPermissionsDropdown user={user} />;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          className="h-auto p-0 font-semibold"
        >
          Joined
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = new Date(row.getValue('createdAt'));
      return (
        <div className="flex flex-col">
          <span className="text-14-medium">
            {formatDistanceToNow(date, { addSuffix: true })}
          </span>
          <span className="text-14-medium text-muted-foreground">
            {date.toLocaleDateString()}
          </span>
        </div>
      );
    },
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => {
      const user = row.original;

      return <DeleteUser userId={user.clerkId} />;
    },
  },
];
