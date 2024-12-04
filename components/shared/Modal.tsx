'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-screen h-dvh bg-white dark:bg-black flex flex-col justify-between items-center z-[999] p-4 sm:p-6 md:p-8"
    >
      <div className="flex justify-between items-center mb-4 w-full">
        <Link href="/" onClick={onClose}>
          <Image
            src="/assets/logo.png"
            width={100}
            height={100}
            alt="sunsetparis_logo_image"
          />
        </Link>
        <button
          onClick={onClose}
          className="dark:text-white text-gray-900 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
      </div>
      {children}
    </motion.div>
  );
};

export default Modal;
