'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useImagePreloader } from '@/hooks/useImagePreloader';
import Link from 'next/link';

interface ImageSliderModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  alt: string;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 1000 : -1000,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 1000 : -1000,
    opacity: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

const ImageSliderModal: React.FC<ImageSliderModalProps> = ({
  isOpen,
  onClose,
  images,
  alt,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const { loadedImages, isLoading } = useImagePreloader(images);

  if (!isOpen) return null;

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex(
      (prevIndex) => (prevIndex + newDirection + images.length) % images.length
    );
  };

  const nextImage = () => paginate(1);
  const prevImage = () => paginate(-1);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-screen h-dvh bg-background backdrop-blur-sm flex flex-col justify-center items-center z-[999] p-4 sm:p-6 md:p-8"
    >
      <div className="flex justify-between items-center mb-4 w-full absolute top-4 px-4 md:px-8">
        <Link href="/">
          <Image
            src="/assets/logo.png"
            width={100}
            height={100}
            alt="sunsetparis_logo_image"
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

      <div className="relative w-full h-[calc(100vh-200px)] max-w-7xl 2xl:max-w-full overflow-hidden">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextImage();
              } else if (swipe > swipeConfidenceThreshold) {
                prevImage();
              }
            }}
            className="absolute w-full h-full flex items-center justify-center"
          >
            {isLoading ? (
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                role="status"
              >
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            ) : (
              <Image
                src={images[currentIndex]}
                alt={`${alt} - Image ${currentIndex + 1}`}
                fill
                className="object-contain"
                priority
                quality={100}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            )}
          </motion.div>
        </AnimatePresence>

        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 transition-all duration-200 z-10"
          aria-label="Previous image"
        >
          <ChevronLeft size={24} className="text-[#FB65A4]" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2  p-3 rounded-full transition-all duration-200 z-10"
          aria-label="Next image"
        >
          <ChevronRight size={24} className="text-[#FB65A4] " />
        </button>
      </div>

      <div className="flex justify-center mt-6 gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
              currentIndex === index
                ? 'bg-gradient-to-t from-[#FCBB53]  via-[#FB65A4] to-[#A67DD2] '
                : 'bg-gradient-to-t from-[#FCBB53]/50  via-[#FB65A4]/50 to-[#A67DD2]/50 '
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default ImageSliderModal;
