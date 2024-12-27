'use client';

import { updateSearchParams } from '@/lib/utils';
import { ARTISTS } from '@/types/artists';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function useProjectStats(projects: any[]) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const projectCounts = projects.reduce((counts, project) => {
    if (counts[project.artist] !== undefined) {
      counts[project.artist]++;
    }
    return counts;
  }, Object.fromEntries(ARTISTS.map((artist) => [artist, 0])));

  const handleArtistSelect = (
    artist: string,
    currentSelection: string | null
  ) => {
    const newValue = currentSelection === artist ? null : artist;
    const params = updateSearchParams(searchParams, 'artist', newValue);
    router.push(`${pathname}?${params.toString()}`);
    return newValue;
  };

  return {
    projectCounts,
    handleArtistSelect,
  };
}
