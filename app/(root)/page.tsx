'use client';

import { artists } from '@/constants';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [mounted, setMounted] = useState(false);
  const visibleArtists = ['gabriel porier', 'romain loiseau'];

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <ul className="flex flex-col items-center justify-center gap-8 md:gap-6 ">
        {artists.map((artist, index) => (
          <li key={index} className="w-full flex justify-center items-center">
            <Link
              href={artist.path}
              className={cn(
                'uppercase text-3xl sm:text-4xl text-center font-light tracking-tighter hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300 px-2',
                !visibleArtists.includes(artist.name) && 'hidden'
              )}
            >
              {artist.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default page;
