'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HeaderLogo } from './HeaderLogo';
import { MenuButton } from './MenuButton';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import ToggleBtn from '../ToggleBtn';
import Modal from '../Modal';
import ContactUs from '../ContactUs';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { logoOpacity, headerOpacity, headerBlur } = useScrollAnimation();

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
    <>
      <motion.nav
        className="w-full absolute top-0 left-0 p-4 md:p-6 flex justify-between items-center z-40 bg-background dark:bg-black"
        style={{
          backdropFilter: `blur(${headerBlur}px)`,
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 100,
          damping: 20,
          duration: 0.8,
        }}
      >
        <MenuButton onClick={openModal} />
        <HeaderLogo opacity={logoOpacity} />
        <ToggleBtn />
      </motion.nav>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ContactUs />
      </Modal>
    </>
  );
};

export default Header;
