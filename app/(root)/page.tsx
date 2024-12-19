'use client';

import { artists } from '@/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full flex flex-col items-center justify-center sm:my-32">
      <ul className="flex flex-col items-center justify-center gap-8 sm:gap-20">
        {artists.map((artist, index) => (
          <li key={index} className="w-full flex justify-center items-center">
            <Link
              href={artist.path}
              className="uppercase text-2xl sm:text-4xl text-center font-light tracking-tighter hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300 px-2"
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
