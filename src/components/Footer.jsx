import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-black/10 dark:border-white/10 relative z-10 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left"
        >
          <div className="flex flex-col gap-1">
            <h4 className="font-bold text-xl tracking-tighter text-black dark:text-white">
              Shreyas<span className="text-accent">.</span>
            </h4>
            <p className="text-black/50 dark:text-white/50 text-xs font-medium uppercase tracking-[0.2em]">
              Portfolio © {new Date().getFullYear()}
            </p>
          </div>
          
          <div className="flex flex-col md:items-end gap-1">
            <p className="text-black/40 dark:text-white/40 text-xs tracking-wider uppercase">
              Designed & Developed by <span className="text-accent font-medium">Shreyas R A</span>
            </p>
            <p className="text-black/30 dark:text-white/30 text-[10px] tracking-widest uppercase">
              Built with React • Framer Motion • Tailwind
            </p>
          </div>
        </motion.div>
      </div>
      
      {/* Subtle Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent"></div>
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-64 h-24 bg-accent/20 blur-[80px] rounded-full pointer-events-none"></div>
    </footer>
  );
};

export default Footer;
