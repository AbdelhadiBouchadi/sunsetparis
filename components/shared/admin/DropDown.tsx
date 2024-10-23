'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useEffect, useState } from 'react';

type DropDownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const artists = [
  { id: 'arthur paux', name: 'Arthur Paux' },
  { id: 'gabriel porier', name: 'Gabriel Porier' },
  { id: 'kevin le dortz', name: 'Kevin Le Dortz' },
  { id: 'mathieu caplanne', name: 'Mathieu Caplanne' },
  { id: 'nicolas gautier', name: 'Nicolas Gautier' },
  { id: 'romain loiseau', name: 'Romain Loiseau' },
  { id: 'thomas canu', name: 'Tomas Canu' },
];

const DropDown = ({ value, onChangeHandler }: DropDownProps) => {
  const [selectedValue, setSelectedValue] = useState(value?.toString() || '');

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChangeHandler(value);
  };

  return (
    <Select onValueChange={handleChange}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder={'Choose An Artist'} />
      </SelectTrigger>
      <SelectContent className="shad-select-content capitalize">
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
