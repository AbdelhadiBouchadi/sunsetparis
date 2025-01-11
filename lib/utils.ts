import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error));
};

export function capitalizeWords(str: string): string {
  return str
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function updateSearchParams(
  searchParams: URLSearchParams,
  key: string,
  value: string | null
): URLSearchParams {
  const params = new URLSearchParams(searchParams);

  if (value === null) {
    params.delete(key);
  } else {
    params.set(key, value);
  }

  return params;
}

export async function getVideoThumbnail(url: string): Promise<string | null> {
  // Vimeo URL patterns
  const vimeoPatterns = [
    /vimeo\.com\/(\d+)/,
    /player\.vimeo\.com\/video\/(\d+)/,
  ];

  // YouTube URL patterns
  const youtubePatterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];

  // Check Vimeo
  for (const pattern of vimeoPatterns) {
    const match = url.match(pattern);
    if (match) {
      try {
        const response = await fetch(
          `https://vimeo.com/api/v2/video/${match[1]}.json`
        );
        const data = await response.json();
        return data[0].thumbnail_large;
      } catch (error) {
        console.error('Error fetching Vimeo thumbnail:', error);
        return null;
      }
    }
  }

  // Check YouTube
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      // Return the highest quality thumbnail available
      return `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`;
    }
  }

  return null;
}
