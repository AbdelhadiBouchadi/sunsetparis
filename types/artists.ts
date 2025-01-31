export const ARTISTS = [
  'arthur paux',
  'gabriel porier',
  'kevin le dortz',
  'mathieu caplanne',
  'nicolas gautier',
  'romain loiseau',
  'thomas canu',
  'abdelhadi bouchadi',
  'evy roselet',
  'salman laudier',
] as const;

export type Artist = (typeof ARTISTS)[number];
