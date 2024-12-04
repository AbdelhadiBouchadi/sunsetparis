import * as z from 'zod';

export const videoSourceSchema = z.object({
  type: z.enum(['vimeo', 'youtube', 'direct']),
  id: z.string(),
  url: z.string(),
});

export type VideoSource = z.infer<typeof videoSourceSchema>;

export const projectFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().optional(),
  artist: z.enum(
    [
      'arthur paux',
      'gabriel porier',
      'kevin le dortz',
      'mathieu caplanne',
      'nicolas gautier',
      'romain loiseau',
      'thomas canu',
    ],
    {
      message: 'Please choose an artist',
    }
  ),
  imageUrl: z.string().url('Image URL must be a valid URL'),
  videoSource: z.string().optional(),
  place: z.string().optional(),
  date: z.string().optional(),
  real: z.string().min(1, { message: 'You forgot to enter the REAL' }),
  dop: z.string().min(1, { message: 'You forgot to enter the DOP' }),
});

export function parseVideoUrl(url: string): string {
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
      return `https://player.vimeo.com/video/${match[1]}`;
    }
  }

  // Check YouTube
  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
  }

  // If no matches, return the original URL
  return url;
}
