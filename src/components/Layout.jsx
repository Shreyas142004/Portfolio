import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useTheme } from './ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

const Layout = () => {
  const { theme } = useTheme();
  const location = useLocation();

  return (
    <div className={`min-h-screen transition-colors duration-500 relative z-0 ${
      theme === 'dark' 
        ? 'bg-transparent text-white selection:bg-neon-purple selection:text-white' 
        : 'bg-transparent text-gray-900 selection:bg-neon-cyan selection:text-black'
    }`}>
      {location.pathname !== '/' && <Navbar />}
      
      <main className={`relative z-10 ${location.pathname !== '/' ? 'pt-24' : ''}`}>
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      {location.pathname !== '/' && <Footer />}
    </div>
  );
};

export default Layout;
