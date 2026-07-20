import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from './ThemeToggle';
import { FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Academics', href: '#academics' },
  { name: 'Certificates', href: '#certificates' },
  { name: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Simple active section detection
      const sections = navLinks.map(link => link.name.toLowerCase());
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navbar - Floating Pill */}
      <nav
        className={`fixed z-50 transition-all duration-500 hidden md:flex left-1/2 -translate-x-1/2 ${
          scrolled 
            ? 'top-6 w-[90%] max-w-5xl bg-white/70 dark:bg-[#0a0a0a]/70 backdrop-blur-xl border border-black/10 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.08)] py-3 px-6 rounded-full' 
            : 'top-8 w-[95%] max-w-6xl bg-white/30 dark:bg-[#0a0a0a]/30 backdrop-blur-md border border-black/5 dark:border-white/5 py-4 px-8 rounded-full shadow-sm'
        }`}
      >
        <div className="flex justify-between items-center w-full">
          {/* Logo */}
          <a href="#home" className="font-bold text-black dark:text-white text-2xl tracking-tighter hover:scale-105 transition-transform">
            Shreyas
          </a>

          {/* Nav Links */}
          <div className="flex items-center gap-2">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => (
                <li key={link.name} className="relative">
                  <a
                    href={link.href}
                    className={`relative z-10 px-4 py-2 text-sm font-medium transition-colors duration-300 rounded-full block ${
                      activeSection === link.name
                        ? 'text-black dark:text-white'
                        : 'text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white'
                    }`}
                    onClick={() => setActiveSection(link.name)}
                  >
                    {link.name}
                  </a>
                  {activeSection === link.name && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-black/5 dark:bg-white/10 rounded-full z-0"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </li>
              ))}
            </ul>
            <div className="bg-black/10 dark:bg-white/10 mx-2 w-px h-6"></div>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 md:hidden bg-white/70 dark:bg-[#050505]/70 backdrop-blur-lg border-b border-black/5 dark:border-white/5 py-4`}
      >
        <div className="flex justify-between items-center mx-auto px-6 container">
          <a href="#home" className="font-bold text-black dark:text-white text-xl tracking-tighter">
            Shreyas
          </a>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-black dark:text-white p-2"
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white/95 dark:bg-[#050505]/95 backdrop-blur-xl border-black/5 dark:border-white/5 border-b overflow-hidden shadow-2xl"
            >
              <ul className="flex flex-col gap-2 px-6 py-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className={`block px-4 py-3 rounded-2xl text-lg font-medium transition-colors ${
                        activeSection === link.name
                          ? 'bg-black/5 dark:bg-white/10 text-black dark:text-white'
                          : 'text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                      onClick={() => {
                        setActiveSection(link.name);
                        setIsMobileMenuOpen(false);
                      }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
  );
};

export default Navbar;
