'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export const NavigationSection = ({ href }: { href?: string }) => {
  const router = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/', { scroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="w-full flex justify-between items-center px-4 py-8">
      <button
        onClick={handleHomeClick}
        className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
      >
        <ChevronLeft
          size={24}
          className="text-[#FB65A4] group-hover:-translate-x-2 transition-all duration-300"
        />
        <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] font-medium">
          Back to Home
        </span>
      </button>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-2 group hover:opacity-80 transition-opacity"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] font-medium">
            View More
          </span>
          <ChevronRight size={24} className="text-[#FB65A4]" />
        </Link>
      )}
    </div>
  );
};
