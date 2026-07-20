import { Mail, FileText, ChevronUp, Terminal } from 'lucide-react';
import { useTheme } from './ThemeContext';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className={`py-12 relative overflow-hidden ${isDark ? 'bg-[#010103] border-t border-white/10' : 'bg-white border-t border-gray-200'}`}>
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0 cyber-grid-bg" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-b border-white/5 pb-10">
          
          {/* Logo & Status info (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <div className="flex items-center gap-2">
              <Terminal className={`${isDark ? 'text-neon-cyan animate-pulse' : 'text-blue-600'} w-6 h-6`} />
              <span className={`font-orbitron font-bold text-lg tracking-wider ${isDark ? 'text-white text-glow-cyan' : 'text-gray-900'}`}>
                SHREYAS<span className={isDark ? 'text-neon-cyan' : 'text-blue-600'}>.</span>RA
              </span>
            </div>
            <p className={`font-rajdhani text-sm leading-relaxed ${isDark ? 'text-gray-500' : 'text-gray-600'}`}>
              Full-Stack software node configured to build immersive, responsive web systems and interactive digital portals.
            </p>
            
            <div className="flex items-center gap-2 pt-2">
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                isDark ? 'bg-neon-cyan shadow-[0_0_10px_#00ffff]' : 'bg-green-500 shadow-[0_0_10px_#22c55e]'
              }`}></span>
              <span className={`font-mono text-[10px] uppercase tracking-widest font-bold ${
                isDark ? 'text-neon-cyan' : 'text-green-600'
              }`}>
                SYS_STATUS: ONLINE
              </span>
            </div>
          </div>

          {/* Quick Links navigation (4 cols) */}
          <div className="md:col-span-4 space-y-4">
            <h4 className={`font-orbitron font-bold text-xs tracking-wider uppercase ${isDark ? 'text-neon-purple' : 'text-pink-600'}`}>
              // QUICK_LINKS
            </h4>
            <div className="grid grid-cols-2 gap-2 font-mono text-xs">
              <a href="#about" onClick={(e) => handleSmoothScroll(e, '#about')} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                &gt; ABOUT
              </a>
              <a href="#academics" onClick={(e) => handleSmoothScroll(e, '#academics')} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                &gt; CHRONOLOGY
              </a>
              <a href="#skills" onClick={(e) => handleSmoothScroll(e, '#skills')} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                &gt; SKILLS
              </a>
              <a href="#projects" onClick={(e) => handleSmoothScroll(e, '#projects')} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                &gt; PROJECTS
              </a>
              <a href="#certificates" onClick={(e) => handleSmoothScroll(e, '#certificates')} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                &gt; CERTIFICATES
              </a>
              <a href="#contact" onClick={(e) => handleSmoothScroll(e, '#contact')} className={`transition-colors duration-300 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                &gt; CONTACT
              </a>
            </div>
          </div>

          {/* Social connections & Resume trigger (4 cols) */}
          <div className="md:col-span-4 space-y-4 md:text-right flex flex-col md:items-end">
            <h4 className={`font-orbitron font-bold text-xs tracking-wider uppercase ${isDark ? 'text-neon-purple' : 'text-pink-600'}`}>
              // SYS_CONNECTIONS
            </h4>
            
            <div className="flex gap-3">
              <a 
                href="mailto:shreyasra7@gmail.com"
                title="Mail Transmission"
                className={`w-9 h-9 rounded flex items-center justify-center border transition-all duration-300 ${
                  isDark 
                    ? 'bg-black border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600'
                }`}
              >
                <Mail className="w-4 h-4" />
              </a>
              
              <a 
                href="https://github.com/Shreyas142004"
                target="_blank"
                rel="noreferrer"
                title="GitHub Core Repository"
                className={`w-9 h-9 rounded flex items-center justify-center border transition-all duration-300 ${
                  isDark 
                    ? 'bg-black border-white/10 text-gray-400 hover:text-white hover:border-white hover:shadow-[0_0_12px_rgba(255,255,255,0.4)]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-black hover:border-black'
                }`}
              >
                <GithubIcon className="w-4 h-4" />
              </a>

              <a 
                href="https://www.linkedin.com/in/shreyas-r-a-6a0567305"
                target="_blank"
                rel="noreferrer"
                title="LinkedIn Network Terminal"
                className={`w-9 h-9 rounded flex items-center justify-center border transition-all duration-300 ${
                  isDark 
                    ? 'bg-black border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan hover:shadow-[0_0_12px_rgba(0,255,255,0.4)]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-blue-600 hover:border-blue-600'
                }`}
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>

              <a 
                href="./shreyas.pdf"
                download
                title="Resume Decrypt File"
                className={`w-9 h-9 rounded flex items-center justify-center border transition-all duration-300 ${
                  isDark 
                    ? 'bg-black border-white/10 text-gray-400 hover:text-neon-purple hover:border-neon-purple hover:shadow-[0_0_12px_rgba(188,19,254,0.4)]'
                    : 'bg-gray-50 border-gray-200 text-gray-600 hover:text-pink-600 hover:border-pink-600'
                }`}
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>

            {/* Back to top styled trigger */}
            <button
              onClick={handleScrollToTop}
              className={`mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded border font-mono text-[10px] font-bold tracking-widest transition-all duration-300 hover:scale-[1.03] ${
                isDark
                  ? 'bg-neon-cyan/5 border-neon-cyan/25 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan hover:shadow-[0_0_15px_rgba(0,255,255,0.3)]'
                  : 'bg-blue-50 border-blue-500 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <ChevronUp className="w-3.5 h-3.5" /> [ BACK_TO_TOP ]
            </button>
          </div>
          
        </div>
        
        {/* Footer legal copyrights and diagnostics */}
        <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className={`font-rajdhani text-xs tracking-wider ${isDark ? 'text-gray-600' : 'text-gray-500'}`}>
            &copy; {new Date().getFullYear()} SHREYAS RA. ALL SYSTEM ARCHIVES RESERVED.
          </p>
          <div className="font-mono text-[10px] text-gray-600 flex gap-4">
            <span>PING: 12ms</span>
            <span>SECURE_LINK: ACTIVE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
