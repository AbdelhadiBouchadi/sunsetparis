'use client';

import { useTransition } from 'react';
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
          'capitalize text-red-700 hover:bg-red-700',
          buttonVariants({ variant: 'ghost' })
        )}
      >
        Delete
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-dark-300">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-white">
            Are you sure you want to delete?
          </AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-gray-200">
            This will permanently delete this project.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="text-accent-foreground">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteProject(projectId);
              })
            }
            className="bg-red-700 hover:bg-red-800"
          >
            {isPending ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
