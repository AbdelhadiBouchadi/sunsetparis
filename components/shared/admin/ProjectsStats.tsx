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

  // Get artist visibility status and project count
  const getArtistStatus = (artist: string) => {
    const artistProjects = projects.filter(
      (project) => project.artist === artist
    );
    const hasProjects = artistProjects.length > 0;
    return {
      isHidden: !hasProjects ? true : artistProjects[0].artistIsHidden,
      hasProjects,
    };
  };

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {ARTISTS.map((artist) => {
        const { isHidden, hasProjects } = getArtistStatus(artist);
        return (
          <StatCard
            key={artist}
            type={artist}
            count={projectCounts[artist]}
            label={capitalizeWords(artist)}
            icon={User}
            isSelected={selectedArtist === artist}
            isHidden={isHidden}
            hasProjects={hasProjects}
            onClick={() => {
              const newSelection = handleArtistSelect(artist, selectedArtist);
              onArtistSelect(newSelection);
            }}
          />
        );
      })}
    </section>
  );
}
