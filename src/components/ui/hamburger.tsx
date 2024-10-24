import React, { useState } from 'react';
import { MotionConfig, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export const AnimatedHamburgerButton = ({
  active,
  setActive,
  className
}: {
  active: boolean;
  setActive: (pv: boolean) => void;
  className?: string
}) => {
  return (
    <MotionConfig
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
      }}
    >
      <motion.div
        initial={false}
        animate={active ? 'open' : 'closed'}
        onClick={() => setActive(!active)}
        className="relative h-16 w-16  rounded-full bg-black/0 transition-colors hover:bg-black/20"
      >
        <motion.span
          variants={VARIANTS.top}
          className={cn("absolute h-1 w-8 bg-black", className)}
          style={{ y: '-50%', left: '50%', x: '-50%', top: '35%' }}
        />
        <motion.span
          variants={VARIANTS.middle}
          className={cn("absolute h-1 w-8 bg-black", className)}
          style={{ left: '50%', x: '-50%', top: '50%', y: '-50%' }}
        />
        <motion.span
          variants={VARIANTS.bottom}
          className={cn("absolute h-1 w-8 bg-black", className)}
          style={{
            x: '-50%',
            y: '50%',
            bottom: '35%',
            left: 'calc(50% + 8px)',
          }}
        />
      </motion.div>
    </MotionConfig>
  );
};

const VARIANTS = {
  top: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      top: ['35%', '50%', '50%'],
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      top: ['50%', '50%', '35%'],
    },
  },
  middle: {
    open: {
      rotate: ['0deg', '0deg', '-45deg'],
    },
    closed: {
      rotate: ['-45deg', '0deg', '0deg'],
    },
  },
  bottom: {
    open: {
      rotate: ['0deg', '0deg', '45deg'],
      bottom: ['35%', '50%', '50%'],
      left: '50%',
    },
    closed: {
      rotate: ['45deg', '0deg', '0deg'],
      bottom: ['50%', '50%', '35%'],
      left: 'calc(50% + 8px)',
    },
  },
};
