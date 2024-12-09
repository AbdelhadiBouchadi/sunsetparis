'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import { fadeIn } from '@/variants';
import Link from 'next/link';
import Image from 'next/image';
import ImageSliderModal from './ImageSlider';

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
  if (!isOpen) return null;

  // If no video source, show a slider of images
  if (!videoSource) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 w-screen h-dvh bg-background flex flex-col justify-between items-center z-[999] p-4 sm:p-6 md:p-8"
      >
        <ImageSliderModal
          images={images}
          alt={title}
          isOpen={isOpen}
          onClose={onClose}
        />
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 w-screen h-dvh bg-background flex flex-col justify-between items-center z-[999] p-4 sm:p-6 md:p-8"
    >
      <div className="flex justify-between items-center mb-4 w-full">
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
          className="text-black hover:text-gray-700 dark:text-white dark:hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
      </div>

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
      <div className="text-black dark:text-white uppercase my-4">
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
    </motion.div>
  );
};

export default VideoModal;
