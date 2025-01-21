'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 w-screen h-dvh bg-white dark:bg-black flex flex-col justify-between items-center z-[999] sm:p-6 md:p-8"
        >
          <div className="flex justify-between items-center mb-4 w-full p-4">
            <Link href="/" onClick={onClose}>
              <Image
                src="/assets/logo.png"
                width={100}
                height={100}
                alt="sunsetparis_logo_image"
                priority
              />
            </Link>
            <button
              onClick={onClose}
              className="text-[#FB65A4] hover:opacity-80 transition-all duration-150"
              aria-label="Close modal"
            >
              <X size={24} />
            </button>
          </div>
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
