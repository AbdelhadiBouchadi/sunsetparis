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

  if (!mounted) return null;

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <nav className="w-full fixed top-0 left-0 p-8 md:p-16 flex justify-between items-center z-50 bg-background">
      <button
        className="flex items-center justify-center group"
        onClick={() => openModal()}
      >
        <div className="relative w-8 h-8 md:w-12 md:h-12 flex items-center justify-center">
          <span className="absolute w-1 md:w-1.5 h-8 md:h-12 bg-gradient-to-t from-[#FCBB53] dark:from-[#FE9492] via-[#FB65A4] to-[#A67DD2] dark:to-[#0D0DA3] rounded-xl z-10"></span>
          <span className="absolute h-1 md:h-1.5 w-8 md:w-12 bg-gradient-to-t from-[#FCBB53] dark:from-[#FE9492] via-[#FB65A4] to-[#A67DD2] dark:to-[#0D0DA3] rounded-xl"></span>
        </div>
      </button>
      <Link href="/" className="flex items-center justify-center">
        <Image
          src="/assets/logo.png"
          width={300}
          height={300}
          alt="sunsetparis_logo_image"
          className="w-auto h-8 md:h-12"
        />
      </Link>
      <ToggleBtn />

      <Modal isOpen={isOpen} onClose={closeModal}>
        <ContactUs />
      </Modal>
    </nav>
  );
};

export default Header;
