'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeIn } from '@/variants';
import Link from 'next/link';
import Image from 'next/image';
import ImageSliderModal from './ImageSlider';
import ImageGrid from './ImageGrid';

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoSource?: string;
  images: string[];
  title: string;
  real: string;
  dop: string;
}

const VideoModal: React.FC<VideoModalProps> = ({
  isOpen,
  onClose,
  videoSource,
  images,
  title,
  real,
  dop,
}) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null
  );

  if (!isOpen) return null;

  const handleImageClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  const handleSliderClose = () => {
    setSelectedImageIndex(null);
  };

  // If slider is open, show the ImageSliderModal
  if (selectedImageIndex !== null) {
    return (
      <ImageSliderModal
        images={images}
        alt={title}
        isOpen={true}
        onClose={handleSliderClose}
        initialIndex={selectedImageIndex}
      />
    );
  }

  // If no video source, show the image grid
  if (!videoSource || images.length > 1) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 w-screen h-dvh bg-background dark:bg-black flex flex-col z-[999] overflow-y-auto"
      >
        <div className="flex justify-between items-center w-full sticky top-0 px-4 py-4 md:px-8 bg-background/80 dark:bg-black/80 backdrop-blur-sm z-10">
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

        <div className="flex-1 py-8">
          <ImageGrid
            images={images}
            onImageClick={handleImageClick}
            title={title}
            real={real}
            dop={dop}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-screen h-dvh bg-background dark:bg-black flex flex-col justify-center items-center z-[999] p-4 sm:p-6 md:p-8"
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

      <div className="flex flex-col items-center justify-center gap-4 md:gap-8 w-full md:mt-16">
        <motion.div
          variants={fadeIn('up', 0.1)}
          initial="hidden"
          animate="show"
          exit="hidden"
          className="w-full md:w-[60%] aspect-w-16 aspect-h-9"
        >
          <iframe
            src={`${videoSource}?title=0&byline=0&portrait=0&transparent=0`}
            width="100%"
            height="100%"
            frameBorder={0}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
        <div className="text-black dark:text-white my-4">
          <p className="text-lg text-gray-700 dark:text-gray-300 text-center">
            {title}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
            {real}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300 text-center">
            {dop}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default VideoModal;
