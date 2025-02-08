'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

interface NavigationSectionProps {
  href?: string;
  selectedCategory: 'all' | 'videos' | 'features';
  onCategoryChange: (category: 'all' | 'videos' | 'features') => void;
  hasFeatures?: boolean;
}

export const NavigationSection = ({
  href,
  selectedCategory,
  onCategoryChange,
  hasFeatures,
}: NavigationSectionProps) => {
  const router = useRouter();

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/', { scroll: true });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      className={cn(
        'w-full grid px-4 md:px-8 py-8 my-4 md:my-8 md:gap-24 grid-cols-2'
        // hasFeatures ? 'grid-cols-3' : 'grid-cols-2'
      )}
    >
      <div className="flex items-center ">
        <button
          onClick={handleHomeClick}
          className="group hover:opacity-80 transition-opacity"
        >
          <ChevronLeft
            size={24}
            className="text-[#FB65A4] group-hover:-translate-x-2 transition-all duration-300"
          />
        </button>
      </div>

      {/* {hasFeatures && (
        <div className="flex justify-center items-center gap-6 md:gap-24 text-xs md:text-lg">
          {selectedCategory !== 'videos' && (
            <button
              onClick={() => {
                onCategoryChange('videos');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={cn(
                'tracking-tighter  hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#FCBB54] hover:via-[#FB65A4] hover:to-[#A67DD2] transition duration-300 uppercase'
              )}
            >
              Work
            </button>
          )}
          {selectedCategory !== 'all' && (
            <button
              onClick={() => {
                onCategoryChange('all');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={cn(
                'tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#FCBB54] hover:via-[#FB65A4] hover:to-[#A67DD2] transition duration-300 uppercase'
              )}
            >
              All
            </button>
          )}
          {selectedCategory !== 'features' && (
            <button
              onClick={() => {
                onCategoryChange('features');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={cn(
                'tracking-tighter hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-t hover:from-[#FCBB54] hover:via-[#FB65A4] hover:to-[#A67DD2] transition duration-300 uppercase'
              )}
            >
              Narratives
            </button>
          )}
        </div>
      )} */}

      {href && (
        <div className="flex items-center justify-end">
          <Link
            href={href}
            className="flex items-center justify-end gap-2 group hover:opacity-80 transition-opacity"
            target="_blank"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-t from-[#FCBB54] via-[#FB65A4] to-[#A67DD2] font-medium text-sm md:text-lg">
              View More
            </span>
            <ChevronRight
              size={24}
              className="text-[#FB65A4] group-hover:translate-x-2 transition-all duration-300"
            />
          </Link>
        </div>
      )}
    </div>
  );
};
