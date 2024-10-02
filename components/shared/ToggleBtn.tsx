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

  // Don't render anything until the component is mounted
  if (!mounted) return null;

  return (
    <div
      className="flex justify-center items-center cursor-pointer"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Image
          src="/images/light_btn.png"
          width={80}
          height={80}
          alt="dark_mode_btn"
        />
      ) : (
        <Image
          src="/images/dark_btn.png"
          width={80}
          height={80}
          alt="light_mode_btn"
        />
      )}
    </div>
  );
};

export default ToggleBtn;
