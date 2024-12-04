'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const ToggleBtn = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  if (!mounted) return null;

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={toggleTheme}
    >
      <Image
        src={
          theme === 'light' ? '/images/light_btn.png' : '/images/dark_btn.png'
        }
        width={80}
        height={80}
        alt={theme === 'light' ? 'dark_mode_btn' : 'light_mode_btn'}
        className="w-8 h-8 md:w-12 md:h-12"
      />
    </div>
  );
};

export default ToggleBtn;
