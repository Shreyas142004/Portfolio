import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-8 border-t border-black/5 dark:border-white/5 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left"
        >
          <p className="text-black/60 dark:text-white/60 text-sm font-medium">
            Designed & Developed by <span className="text-accent font-bold">Shreyas R A</span> © {new Date().getFullYear()}
          </p>
          <p className="text-black/40 dark:text-white/40 text-xs">
            Built with React + Tailwind + GSAP + Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
