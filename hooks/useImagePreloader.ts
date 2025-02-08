'use client';

import { useState, useEffect } from 'react';

export const useImagePreloader = (imageUrls: string[], preloadCount = 2) => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const imageCache = new Map();

    const preloadImages = async () => {
      setIsLoading(true);

      // Calculate which images to preload based on the preloadCount
      const imagesToPreload = imageUrls.slice(0, preloadCount);

      const promises = imagesToPreload.map((url) => {
        // Check if image is already cached
        if (imageCache.has(url)) {
          return Promise.resolve(url);
        }

        return new Promise((resolve, reject) => {
          const imgElement = document.createElement('img');
          imgElement.src = url;

          imgElement.onload = () => {
            if (mounted) {
              imageCache.set(url, true);
              setLoadedImages((prev) => {
                const newSet = new Set(prev);
                newSet.add(url);
                return newSet;
              });
            }
            resolve(url);
          };

          imgElement.onerror = reject;
        });
      });

      try {
        await Promise.all(promises);
      } catch (error) {
        console.error('Error preloading images:', error);
      } finally {
        if (mounted) {
          setIsLoading(false);
        }
      }
    };

    preloadImages();

    return () => {
      mounted = false;
    };
  }, [imageUrls, preloadCount]);

  return { loadedImages: Array.from(loadedImages), isLoading };
};
