import { motion } from 'framer-motion';
import { Download, Eye } from 'lucide-react';
import { useTheme } from './ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="relative flex flex-col justify-center bg-transparent py-24 min-h-screen overflow-hidden">
      {/* Background Decor */}
      <div className={`absolute top-0 right-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none ${isDark ? 'bg-neon-purple/10' : 'bg-pink-300/30'}`} />

      <div className="z-10 relative flex md:flex-row flex-col items-center gap-16 lg:gap-24 mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-6xl">
        
        {/* Left Side: Name and Identity */}
        <div className="relative flex flex-col items-center md:items-start md:-mt-24 w-full md:w-1/2 md:text-left text-center">
          {/* Blue glow exactly behind name card */}
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] blur-[100px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-cyan/20' : 'bg-blue-300/40'}`} />
          
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={`inline-block px-4 sm:px-6 py-6 border rounded-2xl backdrop-blur-sm flex flex-col items-center md:items-start max-w-full ${isDark ? 'bg-black/50 border-neon-cyan/30 shadow-[0_0_30px_rgba(0,255,255,0.1)]' : 'bg-white/80 border-gray-200 shadow-xl'}`}
          >
            <h3 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl font-orbitron font-bold mb-2 tracking-widest text-center md:text-left break-words ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
              SHREYAS R A
            </h3>
            <p className={`font-rajdhani text-sm sm:text-base md:text-lg lg:text-xl tracking-widest uppercase text-center md:text-left break-words mb-6 ${isDark ? 'text-neon-purple' : 'text-pink-600 font-bold'}`}>
                Software Developer - <br/>
                Develops Software applications and systems
            </p>
            
          </motion.div>
        </div>

        {/* Right Side: Details / About Me */}
        <div className="w-full md:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={`p-8 md:p-12 rounded-2xl ${isDark ? 'glass-panel border-white/10' : 'bg-white shadow-lg border border-gray-100'}`}
          >
            <h4 className={`text-3xl font-orbitron font-bold mb-6 ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>
              ABOUT ME
            </h4>
            <div className={`w-16 h-1 mb-8 ${isDark ? 'bg-neon-purple box-glow' : 'bg-pink-500'}`} />
            
            <p className={`font-rajdhani text-xl leading-relaxed mb-6 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              I am a passionate and dedicated <span className={`font-semibold ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>MERN Full Stack Developer</span> focused on building high-performance, responsive, and visually stunning web applications. I specialize in turning complex designs into sleek, interactive user interfaces that provide immersive user experiences while ensuring robust backend architecture.
            </p>
            <p className={`font-rajdhani text-xl leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
              With a strong foundation in <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>C, Python, and Java</span>, I bridge the gap between heavy backend logic and the browser using modern tools like <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>MongoDB, Express, React, Node.js, and Tailwind CSS</span>. I believe in clean code, continuous learning, and pushing the boundaries of modern web design.
            </p>
            
            <div className="flex items-center gap-3 sm:gap-4 mt-8">
              <a 
                href="./shreyas.pdf" 
                download
                className={`inline-flex items-center gap-2 px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-orbitron text-xs sm:text-base font-bold tracking-widest transition-all duration-300 hover:scale-105 ${
                  isDark 
                    ? 'bg-neon-cyan/20 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.6)]' 
                    : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 hover:shadow-xl'
                }`}
              >
                <Download className="w-4 sm:w-5 h-4 sm:h-5"/>
                <span>DOWNLOAD RESUME</span>
              </a>
              
              <a 
                href="./shreyas.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                title="Preview Resume"
                className={`inline-flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full transition-all duration-300 hover:scale-110 flex-shrink-0 ${
                  isDark 
                    ? 'bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(204,0,255,0.6)]' 
                    : 'bg-white border-2 border-pink-500 text-pink-500 shadow-md hover:bg-pink-500 hover:text-white hover:shadow-lg'
                }`}
              >
                <Eye className="w-4 sm:w-5 h-4 sm:h-5"/>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
