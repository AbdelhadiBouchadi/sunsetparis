import * as z from 'zod';

export const projectFormSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
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
  videoSource: z.string().min(1, { message: 'Invalid video URL' }),
  place: z.string().min(1, { message: 'Please Enter the location' }),
  date: z.string().min(1, { message: 'Please Enter The Date' }),
  real: z.string().min(1, { message: 'You forgot to enter the REAL' }),
  dop: z.string().min(1, { message: 'You forgot to enter the DOP' }),
});
