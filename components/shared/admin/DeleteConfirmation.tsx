'use client';

import { useTransition } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { deleteProject } from '@/lib/actions/project.actions';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export const DeleteConfirmation = ({ projectId }: { projectId: string }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          'capitalize text-red-700',
          buttonVariants({ variant: 'ghost' })
        )}
      >
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-dark-600">
            Are you sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-dark-600">
            This will permanently delete this project.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteProject({ projectId });
              })
            }
            className="bg-red-700"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
