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

const categories = [
  { id: 'videos', name: 'Videos' },
  { id: 'features', name: 'Features' },
] as const;

const CategoryDropDown = ({ value, onChangeHandler }: DropDownProps) => {
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
        <SelectValue placeholder="Choose a category" />
      </SelectTrigger>
      <SelectContent className="shad-select-content">
        {categories.map((item, index) => (
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

export default CategoryDropDown;
