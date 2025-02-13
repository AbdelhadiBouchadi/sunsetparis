'use client';

import React from 'react';
import Image from 'next/image';

interface ImageGridProps {
  images: string[];
  onImageClick: (index: number) => void;
  title: string;
  real: string;
  dop: string;
}

const ImageGrid: React.FC<ImageGridProps> = ({
  images,
  onImageClick,
  title,
  real,
  dop,
}) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <div className="text-black dark:text-white mb-8">
        <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
          {title}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
          {real}
        </p>
        <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
          {dop}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-[0.05rem]">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-video cursor-pointer group overflow-hidden"
            onClick={() => onImageClick(index)}
          >
            <Image
              src={image}
              alt={`${title} - Image ${index + 1}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGrid;
