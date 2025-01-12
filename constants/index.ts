import { Artist, Category, TextColor } from '@/types';

export const artists = [
  {
    name: 'arthur paux',
    path: '/arthur-paux',
  },
  {
    name: 'gabriel porier',
    path: '/gabriel-porier',
  },
  {
    name: 'kevin le dortz',
    path: '/kevin-le-dortz',
  },
  {
    name: 'mathieu caplanne',
    path: '/mathieu-caplanne',
  },
  {
    name: 'nicolas gautier',
    path: '/nicolas-gautier',
  },
  {
    name: 'romain loiseau',
    path: '/romain-loiseau',
  },
  {
    name: 'thomas canu',
    path: '/thomas-canu',
  },
];

export const projectDefaultValues = {
  title: '',
  description: '',
  artist: 'arthur paux' as Artist,
  category: 'videos' as Category,
  images: [],
  videoSource: '',
  place: '',
  date: '',
  real: '',
  dop: '',
  order: 1,
  textColor: 'white' as TextColor,
  isHidden: false,
};
