'use client';

import { artists } from '@/constants';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const page = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the header until mounted
  if (!mounted) return null;

  return (
    <div className="w-full flex flex-col items-center justify-center my-10">
      <ul className="flex flex-col items-center justify-center gap-20">
        {artists.map((artist, index) => (
          <li key={index}>
            <Link
              href={artist.path}
              className="uppercase text-4xl text-center font-light hover:text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] transition duration-300"
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
