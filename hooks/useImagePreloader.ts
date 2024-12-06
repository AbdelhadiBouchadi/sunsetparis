'use client';

import { useState, useEffect } from 'react';

export const useImagePreloader = (imageUrls: string[]) => {
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const imagePromises = imageUrls.map((url) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = reject;
      });
    });

    Promise.all(imagePromises)
      .then((urls) => {
        setLoadedImages(urls as string[]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error preloading images:', error);
        setIsLoading(false);
      });
  }, [imageUrls]);

  return { loadedImages, isLoading };
};
