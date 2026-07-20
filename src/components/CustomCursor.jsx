import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeContext';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [hasHover, setHasHover] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    }
    return false;
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');

    const handleMediaQueryChange = (e) => {
      setHasHover(e.matches);
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);

    const updateMousePosition = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseOver = (e) => {
      if (e.target.tagName.toLowerCase() === 'a' || 
          e.target.tagName.toLowerCase() === 'button' ||
          e.target.closest('a') ||
          e.target.closest('button')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    if (mediaQuery.matches) {
      window.addEventListener('mousemove', updateMousePosition);
      window.addEventListener('mouseover', handleMouseOver);
    }

    return () => {
      mediaQuery.removeEventListener('change', handleMediaQueryChange);
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  if (!hasHover) return null;

  const innerColor = isDark ? '#00ffff' : '#2563eb';
  const outerColor = isDark ? '#bc13fe' : '#db2777';

  return (
    <div className="hidden md:block">
      <motion.div
        className={`fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
          scale: isHovering ? 0.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 28, mass: 0.5 }}
        style={{
          backgroundColor: innerColor,
          boxShadow: `0 0 10px ${innerColor}, 0 0 20px ${innerColor}`,
        }}
      />
      <motion.div
        className={`fixed top-0 left-0 w-12 h-12 border-2 rounded-full pointer-events-none z-[9998] ${isDark ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
        animate={{
          x: mousePosition.x - 24,
          y: mousePosition.y - 24,
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.5 : 0.8,
        }}
        transition={{ type: "spring", stiffness: 150, damping: 20, mass: 0.8 }}
        style={{
          borderColor: outerColor,
          boxShadow: `inset 0 0 10px ${outerColor}, 0 0 10px ${outerColor}`,
        }}
      />
    </div>
  );
};

export default CustomCursor;
