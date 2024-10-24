'use client';

import { IProject } from '@/lib/database/models/project.model';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { DeleteConfirmation } from './DeleteConfirmation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { ImageOff } from 'lucide-react';
import Image from 'next/image';

export const columns: ColumnDef<IProject>[] = [
  {
    header: '#',
    cell: ({ row }) => {
      return <p className="text-14-medium ">{row.index + 1}</p>;
    },
  },
  {
    accessorKey: 'imageUrl',
    header: 'Image',
    cell: ({ row }) => {
      return (
        <div className="relative h-16 w-24 rounded-md overflow-hidden bg-neutral-900 border border-neutral-800">
          {row.original.imageUrl ? (
            <Image
              src={row.original.imageUrl}
              alt={row.original.title}
              fill
              className="object-cover"
              sizes="96px"
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center">
              <ImageOff className="h-6 w-6 text-neutral-600" />
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
    cell: ({ row }) => {
      return <p className="text-14-medium">{row.original.title}</p>;
    },
  },
  {
    accessorKey: 'artist',
    header: 'Artist',
    cell: ({ row }) => {
      return <p className="text-14-medium capitalize">{row.original.artist}</p>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
    cell: ({ row }) => {
      return (
        <p className="text-14-medium">
          {new Date(row.original.createdAt).toLocaleDateString()}
        </p>
      );
    },
  },
  {
    id: '_id',
    header: 'Actions',
    cell: ({ row }) => {
      const projectId = row.original._id;

      return (
        <div className="flex gap-1">
          <Link
            href={`/sunsetparis-admin/${projectId}/update`}
            className={cn(
              'capitalize text-green-700',
              buttonVariants({ variant: 'ghost' })
            )}
          >
            Edit
          </Link>

          <DeleteConfirmation projectId={projectId} />
        </div>
      );
    },
  },
];

export default columns;
