'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button, buttonVariants } from '@/components/ui/button';
import { useState } from 'react';
import { IProject } from '@/lib/database/models/project.model';
import { ProjectStats } from './ProjectsStats';
import { ProjectsTable } from './ProjectsTable';

interface AdminDashboardProps {
  projects: IProject[];
}

export function AdminDashboard({ projects }: AdminDashboardProps) {
  const [selectedArtist, setSelectedArtist] = useState<string | null>(null);

  const filteredProjects = selectedArtist
    ? projects.filter((project) => project.artist === selectedArtist)
    : projects;

  return (
    <main className="p-8 w-full mx-auto">
      <section className="mb-8">
        <h1 className="text-3xl font-bold text-zinc-100 mb-2">Welcome 👋</h1>
        <p className="text-zinc-400">
          Start the day with managing new projects.
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
              onClick={() => setSelectedArtist(null)}
              className="text-sm  text-white font-medium transition-color transition-colors bg-green-700 hover:bg-green-400"
            >
              Show all projects
            </Button>
          </div>
        )}

        <ProjectsTable projects={filteredProjects} />

        <Link
          href="/sunsetparis-admin/create"
          className={cn(
            'inline-flex items-center justify-center w-full py-3 px-4 rounded-lg bg-green-700 hover:bg-green-400 text-white font-medium transition-colors',
            buttonVariants({ variant: 'link' })
          )}
        >
          Create a new project
        </Link>
      </div>
    </main>
  );
}
