'use client';

import { artists } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getAllProjects } from '@/lib/actions/project.actions';

const Page = () => {
  const [mounted, setMounted] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const allProjects = await getAllProjects();
      setProjects(allProjects);
    };

    fetchProjects();
    setMounted(true);
  }, []);

  if (!mounted) return null;

  // Get artists with their project counts and visibility status
  const artistsStatus = artists.reduce(
    (acc: Record<string, { count: number; isHidden: boolean }>, artist) => {
      const artistProjects = projects.filter(
        (project) => project.artist === artist.name
      );
      acc[artist.name] = {
        count: artistProjects.length,
        isHidden:
          artistProjects.length === 0
            ? true
            : artistProjects[0]?.artistIsHidden ?? true,
      };
      return acc;
    },
    {}
  );

  // Filter and sort visible artists alphabetically
  const visibleArtists = artists
    .filter((artist) => !artistsStatus[artist.name]?.isHidden)
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex flex-col items-center justify-center gap-8 md:gap-6">
        {visibleArtists.map((artist, index) => (
          <li key={index} className="w-full flex justify-center items-center">
            <Link
              href={artist.path}
              className="uppercase text-3xl sm:text-4xl text-center font-light tracking-tighter hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300 px-2"
            >
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
