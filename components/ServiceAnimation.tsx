'use client';

import { motion } from 'framer-motion';

interface ServiceAnimationProps {
  serviceId: string;
  className?: string;
}

export default function ServiceAnimation({ serviceId, className = '' }: ServiceAnimationProps) {
  const animationProps = {
    animate: { scale: [1, 1.05, 1] },
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  };

  switch (serviceId) {
    case 'carpentry-wood-flooring':
      return <CarpentryAnimation className={className} {...animationProps} />;
    case 'floor-wall-tiling':
      return <TilingAnimation className={className} {...animationProps} />;
    case 'plumbing-sanitary':
      return <PlumbingAnimation className={className} {...animationProps} />;
    case 'painting':
      return <PaintingAnimation className={className} {...animationProps} />;
    case 'air-conditioning':
      return <AirConditioningAnimation className={className} {...animationProps} />;
    default:
      return <DefaultAnimation className={className} {...animationProps} />;
  }
}

function CarpentryAnimation({ className, ...props }: any) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="100"
        y="150"
        width="200"
        height="30"
        fill="#2f5a65"
        rx="4"
        animate={{
          x: [100, 110, 100],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.path
        d="M120 180 L160 100 L200 180"
        fill="#0e7888"
        stroke="#213f51"
        strokeWidth="3"
        animate={{
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.circle
        cx="280"
        cy="165"
        r="15"
        fill="#0e7888"
        animate={{
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

function TilingAnimation({ className, ...props }: any) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="100"
        y="140"
        width="100"
        height="100"
        fill="#2f5a65"
        stroke="#213f51"
        strokeWidth="4"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.rect
        x="200"
        y="140"
        width="100"
        height="100"
        fill="#0e7888"
        stroke="#213f51"
        strokeWidth="4"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          delay: 0.3,
          ease: 'easeInOut',
        }}
      />
      <motion.rect
        x="100"
        y="240"
        width="100"
        height="100"
        fill="#0e7888"
        stroke="#213f51"
        strokeWidth="4"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          delay: 0.3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.rect
        x="200"
        y="240"
        width="100"
        height="100"
        fill="#2f5a65"
        stroke="#213f51"
        strokeWidth="4"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

function PlumbingAnimation({ className, ...props }: any) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <motion.path
        d="M120 120 L120 280 L280 280 L280 120"
        fill="none"
        stroke="#2f5a65"
        strokeWidth="16"
        strokeLinecap="round"
      />
      <motion.circle
        cx="200"
        cy="200"
        r="60"
        fill="none"
        stroke="#0e7888"
        strokeWidth="8"
        strokeDasharray="20 10"
        animate={{
          rotate: [0, 360],
          strokeDashoffset: [0, 30],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.rect
        x="170"
        y="170"
        width="60"
        height="16"
        fill="#213f51"
        rx="8"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </svg>
  );
}

function PaintingAnimation({ className, ...props }: any) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="80" y="120" width="240" height="160" fill="#2f5a65" />
      <motion.path
        d="M160 160 Q200 120 240 160 T320 160"
        fill="none"
        stroke="#0e7888"
        strokeWidth="12"
        strokeLinecap="round"
        animate={{
          pathLength: [0, 1, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
      <motion.ellipse
        cx="140"
        cy="200"
        rx="30"
        ry="40"
        fill="#0e7888"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

function AirConditioningAnimation({ className, ...props }: any) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <rect x="100" y="140" width="200" height="120" fill="#2f5a65" rx="8" />
      <motion.circle
        cx="200"
        cy="200"
        r="40"
        fill="none"
        stroke="#0e7888"
        strokeWidth="6"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
      <motion.path
        d="M120 160 L160 120 M280 160 L320 120 M120 240 L160 280 M280 240 L320 280"
        stroke="#0e7888"
        strokeWidth="4"
        strokeLinecap="round"
        animate={{
          opacity: [0.3, 1, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

function DefaultAnimation({ className, ...props }: any) {
  return (
    <svg viewBox="0 0 400 400" className={`w-full h-full ${className}`} xmlns="http://www.w3.org/2000/svg">
      <motion.rect
        x="120"
        y="160"
        width="160"
        height="80"
        fill="#2f5a65"
        rx="8"
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </svg>
  );
}

