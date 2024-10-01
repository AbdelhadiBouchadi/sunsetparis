'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import ToggleBtn from './ToggleBtn';
import Modal from './Modal';
import ContactUs from './ContactUs';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render the header until mounted
  if (!mounted) return null;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className="w-full  p-8 md:p-12 xl:p-16 flex justify-between items-center">
      <button
        className="relative w-10 h-10 mx-4 flex items-center justify-center group"
        onClick={() => openModal()}
      >
        <span className="absolute w-1 h-10 bg-gradient-to-t from-[#FCBB53] dark:from-[#FE9492] via-[#FB65A4]   to-[#A67DD2] dark:to-[#0D0DA3] rounded-xl z-10"></span>
        <span className="absolute h-1 w-10 bg-gradient-to-t from-[#FCBB53] dark:from-[#FE9492] via-[#FB65A4] to-[#A67DD2] dark:to-[#0D0DA3] rounded-xl"></span>
      </button>
      <Link href="/">
        <Image
          src="/assets/logo.png"
          width={180}
          height={300}
          alt="sunsetparis_logo_image"
          className="w-auto h-auto"
        />
      </Link>
      <ToggleBtn />

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <ContactUs />
      </Modal>
    </nav>
  );
};

export default Header;
