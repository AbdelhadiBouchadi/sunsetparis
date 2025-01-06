'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TextColor } from '@/types';
import { useEffect, useState } from 'react';

type DropDownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
};

const textColors = [
  { id: 'white', name: 'White' },
  { id: 'black', name: 'Black' },
] as const;

const TextColorDropDown = ({ value, onChangeHandler }: DropDownProps) => {
  const [selectedValue, setSelectedValue] = useState(value?.toString() || '');

  useEffect(() => {
    setSelectedValue(value?.toString() || '');
  }, [value]);

  const handleChange = (value: string) => {
    setSelectedValue(value);
    onChangeHandler(value);
  };

  return (
    <Select value={value} onValueChange={onChangeHandler}>
      <SelectTrigger className="shad-select-trigger">
        <SelectValue placeholder="Choose a text color" />
      </SelectTrigger>
      <SelectContent className="shad-select-content">
        {textColors.map((item, index) => (
          <SelectItem
            key={index}
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

export default TextColorDropDown;
