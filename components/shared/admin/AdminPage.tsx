'use client';

import Link from 'next/link';
import { cn, updateSearchParams } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { IProject } from '@/lib/database/models/project.model';
import { ProjectStats } from './ProjectsStats';
import { ProjectsTable } from './ProjectsTable';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface AdminDashboardProps {
  projects: IProject[];
}

export function AdminDashboard({ projects }: AdminDashboardProps) {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const artistFromUrl = searchParams.get('artist');
    setSelectedArtist(artistFromUrl);
  }, [searchParams]);

  const filteredProjects = selectedArtist
    ? projects.filter((project) => project.artist === selectedArtist)
    : projects;

  const handleHideProjects = () => {
    const params = updateSearchParams(searchParams, 'artist', null);
    router.push(`${pathname}?${params.toString()}`);
    setSelectedArtist(null);
  };

  const createProjectUrl = selectedArtist
    ? `/sunsetparis-admin/create?artist=${encodeURIComponent(selectedArtist)}`
    : '/sunsetparis-admin/create';

  return (
    <main className="p-8 w-full mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">
          Welcome Adélia 👋
        </h1>
        <p className="text-zinc-400">
          Start the day with managing your projects.
        </p>
      </section>

      <ProjectStats
        projects={projects}
        selectedArtist={selectedArtist}
        onArtistSelect={setSelectedArtist}
      />

      <div className="space-y-6">
        {selectedArtist && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              Showing projects for{' '}
              <span className="font-bold text-lg text-green-700">
                {selectedArtist
                  .split(' ')
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(' ')}
              </span>
            </p>
            <Button
              onClick={handleHideProjects}
              className="text-sm text-white font-medium transition-color transition-colors bg-green-700 hover:bg-green-400"
            >
              Hide projects
            </Button>
          </div>
        )}

        {selectedArtist && (
          <ProjectsTable
            key={selectedArtist}
            projects={filteredProjects}
            selectedArtist={selectedArtist}
          />
        )}

        <Link
          href={createProjectUrl}
          className={cn(
            'inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-green-700 hover:bg-green-400 text-white font-medium transition-colors',
            buttonVariants({ variant: 'link' })
          )}
        >
          Create a new project
        </Link>
        <Link
          href="/sunsetparis-admin/contact"
          className={cn(
            'inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800  border-2 border-zinc-800 hover:border-green-700 hover:from-zinc-800 hover:to-zinc-900 !text-zinc-400 hover:text-green-500 font-medium transition-colors',
            buttonVariants({ variant: 'link' })
          )}
        >
          Manage Contact Section
        </Link>
        <Link
          href="/sunsetparis-admin/users"
          className={cn(
            'inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-gradient-to-br from-zinc-900 to-zinc-800  border-2 border-zinc-800 hover:border-green-700 hover:from-zinc-800 hover:to-zinc-900 !text-zinc-400 hover:text-green-500 font-medium transition-colors',
            buttonVariants({ variant: 'link' })
          )}
        >
          Manage Users
        </Link>
      </div>
    </main>
  );
}
