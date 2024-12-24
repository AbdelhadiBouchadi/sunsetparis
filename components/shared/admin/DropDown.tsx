'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Artist } from '@/types';

type DropDownProps = {
  value?: Artist;
  onChangeHandler: (value: Artist) => void;
};

const artists = [
  { id: 'arthur paux', name: 'Arthur Paux' },
  { id: 'gabriel porier', name: 'Gabriel Porier' },
  { id: 'kevin le dortz', name: 'Kevin Le Dortz' },
  { id: 'mathieu caplanne', name: 'Mathieu Caplanne' },
  { id: 'nicolas gautier', name: 'Nicolas Gautier' },
  { id: 'romain loiseau', name: 'Romain Loiseau' },
  { id: 'thomas canu', name: 'Thomas Canu' },
] as const;

const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
  const getArtistName = (id: Artist) => {
    return artists.find((artist) => artist.id === id)?.name || id;
  };

  return (
    <Select value={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder="Choose An Artist">
          {value ? getArtistName(value) : 'Choose An Artist'}
        </SelectValue>
      </SelectTrigger>
      <SelectContent className="shad-select-content">
        {artists.map((item) => (
          <SelectItem
            key={item.id}
            value={item.id}
            className="flex cursor-pointer items-center gap-2"
          >
            {item.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default DropDown;
