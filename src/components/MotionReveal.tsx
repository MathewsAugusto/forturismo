'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface MotionRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  withBlur?: boolean;
}

export default function MotionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.9,
  distance = 26,
  className = '',
  withBlur = true,
  ...props
}: MotionRevealProps) {
  let initial: Record<string, string | number> = {
    opacity: 0,
    ...(withBlur ? { filter: 'blur(8px)' } : {}),
  };

  switch (direction) {
    case 'up':
      initial = { ...initial, y: distance };
      break;
    case 'down':
      initial = { ...initial, y: -distance };
      break;
    case 'left':
      initial = { ...initial, x: distance };
      break;
    case 'right':
      initial = { ...initial, x: -distance };
      break;
    case 'scale':
      initial = { ...initial, scale: 0.95 };
      break;
    case 'none':
      break;
  }

  return (
    <motion.div
      initial={initial}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Luxurious smooth deceleration curve
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
