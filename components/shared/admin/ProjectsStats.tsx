import { User } from 'lucide-react';
import { StatCard } from './StatCard';

const ARTISTS = [
  'arthur paux',
  'gabriel porier',
  'kevin le dortz',
  'mathieu caplanne',
  'nicolas gautier',
  'romain loiseau',
  'thomas canu',
] as const;

type ProjectStatsProps = {
  projects: any[];
  selectedArtist: string | null;
  onArtistSelect: (artist: string) => void;
};

export function ProjectStats({
  projects,
  selectedArtist,
  onArtistSelect,
}: ProjectStatsProps) {
  const projectCounts = projects.reduce((counts, project) => {
    if (counts[project.artist] !== undefined) {
      counts[project.artist]++;
    }
    return counts;
  }, Object.fromEntries(ARTISTS.map((artist) => [artist, 0])));

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
      {ARTISTS.map((artist) => (
        <StatCard
          key={artist}
          type={artist}
          count={projectCounts[artist]}
          label={artist
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')}
          icon={User}
          isSelected={selectedArtist === artist}
          onClick={() => onArtistSelect(artist)}
        />
      ))}
    </section>
  );
}
