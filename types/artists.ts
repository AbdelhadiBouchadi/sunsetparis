export const ARTISTS = [
  'arthur paux',
  'gabriel porier',
  'kevin le dortz',
  'mathieu caplanne',
  'nicolas gautier',
  'romain loiseau',
  'thomas canu',
  'abdelhadi bouchadi',
] as const;

export type Artist = (typeof ARTISTS)[number];
