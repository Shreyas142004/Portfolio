import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Terminal, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { useTheme } from './ThemeContext';
import { useAudio } from './AudioContext';

const navLinks = [
  { name: 'ABOUT', href: '#about' },
  { name: 'ACADEMICS', href: '#academics' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'PROJECTS', href: '#projects' },
  { name: 'CONTACT', href: '#contact' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('about');
  const { theme,  toggleTheme } = useTheme();
  const { isPlaying, toggleAudio } = useAudio();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Section tracking for active state
      const sections = navLinks.map(link => link.href.substring(1));
      let currentActive = 'about';
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the top of the section is near the top of the viewport
          if (rect.top <= 100 && rect.bottom >= 100) {
            currentActive = section;
          }
        }
      }
      setActiveSection(currentActive);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80, // Offset for navbar
        behavior: 'smooth'
      });
      setIsOpen(false);
    }
  };

  const isDark = theme === 'dark';

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? isDark 
            ? 'bg-black/80 backdrop-blur-md border-b border-neon-cyan/20 py-3' 
            : 'bg-white/80 backdrop-blur-md border-b border-gray-200 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div onClick={(e) => handleSmoothScroll(e, '#about')} className="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <Terminal className={`${isDark ? 'text-neon-cyan' : 'text-blue-600'} w-8 h-8`} />
            <span className={`font-orbitron font-bold text-xl tracking-wider ${isDark ? 'text-white text-glow' : 'text-black'}`}>
              SHREYAS<span className={isDark ? 'text-neon-cyan' : 'text-blue-600'}>.</span>RA
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleSmoothScroll(e, link.href)}
                  className={`font-orbitron text-sm tracking-widest transition-colors duration-300 relative group ${
                    isActive 
                      ? isDark ? 'text-neon-cyan' : 'text-blue-600'
                      : isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 h-0.5 transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  } ${isDark ? 'bg-neon-cyan box-glow' : 'bg-blue-600'}`}></span>
                </a>
              );
            })}
            
            <div className="flex items-center gap-4">
              {/* Audio Toggle Button */}
              <button
                onClick={toggleAudio}
                className={`p-2 rounded-full border transition-colors ${
                  isDark 
                    ? 'border-white/20 text-white hover:text-neon-purple hover:border-neon-purple hover:bg-neon-purple/10' 
                    : 'border-gray-300 text-gray-800 hover:text-pink-600 hover:border-pink-600 hover:bg-pink-50'
                }`}
              >
                {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full border transition-colors ${
                  isDark 
                    ? 'border-white/20 text-white hover:text-neon-cyan hover:border-neon-cyan hover:bg-neon-cyan/10' 
                    : 'border-gray-300 text-gray-800 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-50'
                }`}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={toggleAudio}
              className={`p-2 rounded-full border transition-colors ${
                isDark 
                  ? 'border-white/20 text-white' 
                  : 'border-gray-300 text-gray-800'
              }`}
            >
              {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-colors ${
                isDark 
                  ? 'border-white/20 text-white' 
                  : 'border-gray-300 text-gray-800'
              }`}
            >
              {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isDark ? 'text-gray-300 hover:text-neon-cyan' : 'text-gray-800 hover:text-blue-600'} focus:outline-none`}
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`md:hidden absolute top-full left-0 w-full backdrop-blur-xl border-b ${
              isDark ? 'bg-black/95 border-neon-purple/30' : 'bg-white/95 border-gray-200'
            }`}
          >
            <div className="px-4 pt-2 pb-6 space-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleSmoothScroll(e, link.href)}
                    className={`block font-orbitron text-base transition-colors border-l-2 pl-3 ${
                      isActive
                        ? isDark ? 'border-neon-purple text-neon-purple' : 'border-blue-600 text-blue-600'
                        : isDark ? 'border-transparent text-gray-300 hover:border-neon-purple hover:text-neon-purple' : 'border-transparent text-gray-600 hover:border-blue-600 hover:text-blue-600'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
