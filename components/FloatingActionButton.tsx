'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';
import ContactModal from './ContactModal';

function FloatingActionButton() {
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsModalOpen(true);
  };

  if (!mounted) return null;

  return (
    <>
      <div
        style={{
          position: 'fixed',
          bottom: '32px',
          right: '32px',
          zIndex: 99999,
        }}
      >
        <motion.button
          onClick={handleClick}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center justify-center w-16 h-16 rounded-full shadow-lg cursor-pointer transition-all duration-300 border-none"
          style={{
            background: 'linear-gradient(135deg, #0e7888 0%, #2f5a65 100%)',
            boxShadow: '0 4px 20px rgba(14, 120, 136, 0.4), 0 0 40px rgba(14, 120, 136, 0.2)',
          }}
          aria-label="Contact Us"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <MessageCircle 
            className="w-7 h-7 text-white" 
            strokeWidth={2}
          />
        </motion.button>
      </div>
      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}

export default FloatingActionButton;
