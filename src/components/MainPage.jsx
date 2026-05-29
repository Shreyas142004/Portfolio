import Navbar from './Navbar';
import About from './About';
import Academics from './Academics';
import Skills from './Skills';
import Projects from './Projects';
import Certificates from './Certificates';
import Contact from './Contact';
import Footer from './Footer';
import Background from './Background';
import { useTheme } from './ThemeContext';

const MainPage = () => {
  const { theme } = useTheme();

  return (
    <div className={`min-h-screen transition-colors duration-500 relative z-0 ${
      theme === 'dark' 
        ? 'bg-[#050505] text-white selection:bg-neon-purple selection:text-white' 
        : 'bg-gray-50 text-gray-900 selection:bg-neon-cyan selection:text-black'
    }`}>
      <Background />
      <Navbar />
      
      <main className="relative z-10 pt-24">
        <div id="about"><About /></div>
        <div id="academics"><Academics /></div>
        <div id="skills"><Skills /></div>
        <div id="projects"><Projects /></div>
        <div id="certificates"><Certificates /></div>
        <div id="contact"><Contact /></div>
      </main>

      <Footer />
    </div>
  );
};

export default MainPage;
