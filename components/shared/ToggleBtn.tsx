'use client';

import { useTheme } from 'next-themes';
import Image from 'next/image';
import React from 'react';

const ToggleBtn = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Image
          src="/images/light_btn.png"
          width={65}
          height={65}
          alt="dark_mode_btn"
        />
      ) : (
        <Image
          src="/images/dark_btn.png"
          width={65}
          height={65}
          alt="light_mode_btn"
        />
      )}
    </div>
  );
};

export default ToggleBtn;
