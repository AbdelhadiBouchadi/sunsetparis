'use client';

import { useScroll, useSpring, useTransform } from 'framer-motion';

export const useScrollAnimation = () => {
  const { scrollY } = useScroll();

  // Create spring configurations for smoother animations
  const springConfig = {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  };

  // Create base transforms
  const rawLogoOpacity = useTransform(scrollY, [0, 80], [1, 0]);
  const rawHeaderOpacity = useTransform(scrollY, [0, 80], [1, 0.85]);
  const rawHeaderBlur = useTransform(scrollY, [0, 80], [0, 10000]);

  // Apply spring physics to the animations
  const logoOpacity = useSpring(rawLogoOpacity, springConfig);
  const headerOpacity = useSpring(rawHeaderOpacity, springConfig);
  const headerBlur = useSpring(rawHeaderBlur, springConfig);

  return {
    logoOpacity,
    headerOpacity,
    headerBlur,
  };
};
