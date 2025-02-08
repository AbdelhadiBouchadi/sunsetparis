'use client';

import { Button } from '@/components/ui/button';
import { toggleArtistVisibility } from '@/lib/actions/project.actions';
import { Eye, EyeOff } from 'lucide-react';
import { useTransition } from 'react';
import { toast } from 'sonner';

type ToggleArtistVisibilityProps = {
  artist: string;
  isHidden: boolean;
};

export function ToggleArtistVisibility({
  artist,
  isHidden,
}: ToggleArtistVisibilityProps) {
  const [isPending, startTransition] = useTransition();

  const handleToggle = () => {
    startTransition(async () => {
      try {
        await toggleArtistVisibility(artist);
        toast.success(
          `Artist visibility ${isHidden ? 'enabled' : 'disabled'} successfully`
        );
      } catch (error) {
        toast.error('Failed to toggle artist visibility');
      }
    });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleToggle}
      disabled={isPending}
      className="text-zinc-400 hover:text-green-400 hover:bg-green-900/20"
    >
      {isHidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </Button>
  );
}
