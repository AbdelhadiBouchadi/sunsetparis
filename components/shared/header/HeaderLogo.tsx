'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface HeaderLogoProps {
  opacity: any;
}

export const HeaderLogo = ({ opacity }: HeaderLogoProps) => {
  return (
    <motion.div style={{ opacity }}>
      <Link href="/" className="flex items-center justify-center">
        <Image
          src="/assets/logo.png"
          width={300}
          height={300}
          alt="sunsetparis_logo_image"
          className="w-auto h-10 md:h-12 transition-transform duration-300 hover:scale-105"
        />
      </Link>
    </motion.div>
  );
};
