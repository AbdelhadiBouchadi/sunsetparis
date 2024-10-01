import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/variants';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const overlayClasses = isOpen
    ? 'fixed inset-0 w-screen h-screen bg-white/60 dark:bg-black/10 backdrop-blur-sm flex justify-center items-center z-[999] transition-all duration-300 ease-in-out'
    : 'fixed inset-0 w-screen h-screen bg-white/60 dark:bg-black/10 backdrop-blur-sm flex justify-center items-center z-[999] transition-all duration-300 ease-in-out opacity-0 pointer-events-none';

  if (!isOpen) return null;

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLDivElement && e.target.id === 'wrapper') {
      onClose();
    }
  };

  return (
    <div className={overlayClasses} id="wrapper" onClick={handleClose}>
      <motion.div
        variants={fadeIn('up', 0.1)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="max-w-[980px] 2xl:max-w-[1366px] mx-4 md:mx-0 w-full cursor-default flex flex-col gap-2 items-center justify-center relative"
      >
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
