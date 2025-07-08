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
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { deleteUser } from '@/lib/actions/user.actions';
import { Trash2Icon } from 'lucide-react';

export const DeleteUser = ({ userId }: { userId: string }) => {
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          'capitalize text-red-700 hover:bg-red-700',
          buttonVariants({ variant: 'ghost' })
        )}
      >
        <Trash2Icon className="size-4" />
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
          <AlertDialogCancel className="text-muted-foreground">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={() =>
              startTransition(async () => {
                await deleteUser(userId);
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
