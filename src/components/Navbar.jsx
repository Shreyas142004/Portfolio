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
      setScrolled(window.scrollY > 50);

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
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-4 bg-white/70 dark:bg-[#050505]/70 backdrop-blur-lg border-b border-black/5 dark:border-white/5'
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="flex justify-between items-center mx-auto px-6 container">
        {/* Logo */}
        <a href="#home" className="font-bold text-accent text-2xl tracking-tighter">
          Shreyas<span className="text-black dark:text-white">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-accent ${
                    activeSection === link.name
                      ? 'text-accent'
                      : 'text-black/60 dark:text-white/60'
                  }`}
                  onClick={() => setActiveSection(link.name)}
                >
                  {link.name}
                </a>
                {activeSection === link.name && (
                  <motion.div
                    layoutId="activeSection"
                    className="right-0 -bottom-2 left-0 absolute bg-accent rounded-full h-0.5"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </li>
            ))}
          </ul>
          <div className="bg-black/10 dark:bg-white/10 mx-2 w-[1px] h-6"></div>
          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-black dark:text-white"
          >
            {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-[#050505] border-black/5 dark:border-white/5 border-b overflow-hidden"
          >
            <ul className="flex flex-col gap-4 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`block text-lg font-medium ${
                      activeSection === link.name
                        ? 'text-accent'
                        : 'text-black/70 dark:text-white/70'
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
  );
};

export default Navbar;
