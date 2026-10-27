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
  cascade?: boolean;
}

export default function MotionReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 32,
  className = '',
  ...props
}: MotionRevealProps) {
  let initial = {};

  switch (direction) {
    case 'up':
      initial = { opacity: 0, y: distance };
      break;
    case 'down':
      initial = { opacity: 0, y: -distance };
      break;
    case 'left':
      initial = { opacity: 0, x: distance };
      break;
    case 'right':
      initial = { opacity: 0, x: -distance };
      break;
    case 'scale':
      initial = { opacity: 0, scale: 0.94 };
      break;
    case 'none':
      initial = { opacity: 0 };
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
      }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // Smooth cubic-bezier
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
