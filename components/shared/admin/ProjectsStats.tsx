'use client';

import { User } from 'lucide-react';
import { StatCard } from './StatCard';
import { useProjectStats } from '@/hooks/useProjectStats';
import { ARTISTS } from '@/types/artists';
import { capitalizeWords } from '@/lib/utils';

type ProjectStatsProps = {
  projects: any[];
  selectedArtist: string | null;
  onArtistSelect: (artist: string | null) => void;
};

export function ProjectStats({
  projects,
  selectedArtist,
  onArtistSelect,
}: ProjectStatsProps) {
  const { projectCounts, handleArtistSelect } = useProjectStats(projects);

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {ARTISTS.map((artist) => (
        <StatCard
          key={artist}
          type={artist}
          count={projectCounts[artist]}
          label={capitalizeWords(artist)}
          icon={User}
          isSelected={selectedArtist === artist}
          onClick={() => {
            const newSelection = handleArtistSelect(artist, selectedArtist);
            onArtistSelect(newSelection);
          }}
        />
      ))}
    </section>
  );
}
