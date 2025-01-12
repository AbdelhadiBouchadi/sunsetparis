'use client';

import { Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { useTransition } from 'react';
import { toggleProjectHidden } from '@/lib/actions/project.actions';

interface ToggleHiddenProps {
  projectId: string;
  isHidden: boolean;
}

export function ToggleHidden({
  projectId,
  isHidden: initialIsHidden,
}: ToggleHiddenProps) {
  const [isHidden, setIsHidden] = useState(initialIsHidden);
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        const updatedProject = await toggleProjectHidden(projectId);
        setIsHidden(updatedProject.isHidden);
      } catch (error) {
        console.error('Failed to toggle visibility:', error);
        // Revert the optimistic update if there was an error
        setIsHidden(!isHidden);
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isPending}
      className={cn(
        'hover:bg-neutral-300',
        isHidden ? 'text-neutral-500' : 'text-neutral-300 hover:bg-neutral-600'
      )}
    >
      {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  );
}
