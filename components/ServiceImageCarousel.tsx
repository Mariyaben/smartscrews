'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const TRANSITION_DURATION = 3000; // 3.5 seconds per image

interface ServiceImageCarouselProps {
  images: string[];
  alt: string;
}

export default function ServiceImageCarousel({ images, alt }: ServiceImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images immediately
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = images.map((src) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => resolve();
          img.onerror = () => resolve(); // Continue even if one fails
          img.src = src;
        });
      });

      await Promise.all(imagePromises);
      setImagesLoaded(true);
    };

    preloadImages();
  }, [images]);

  // Auto-rotate images
  useEffect(() => {
    if (!imagesLoaded || images.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, TRANSITION_DURATION);

    return () => clearInterval(interval);
  }, [imagesLoaded, images.length]);

  // If only one image, just show it without carousel
  if (images.length === 1) {
    return (
      <div className="relative w-full h-full">
        <Image
          src={images[0]}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
          priority
          unoptimized
        />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <AnimatePresence mode="wait" initial={false}>
        {images.map((imagePath, index) => {
          if (index !== currentIndex) return null;

          return (
            <motion.div
              key={imagePath}
              initial={index === 0 ? { opacity: 1 } : { opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{
                duration: 0.8,
                ease: [0.4, 0, 0.2, 1], // Smooth easing
              }}
              className="absolute inset-0"
            >
              <Image
                src={imagePath}
                alt={alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={index === 0}
                unoptimized
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`transition-all duration-300 rounded-full ${
              index === currentIndex
                ? 'w-2.5 h-2.5 bg-white'
                : 'w-2 h-2 bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

