import { motion } from 'framer-motion';
import { Download, Eye, ShieldCheck, Terminal, Globe, User, GraduationCap, Briefcase, Info } from 'lucide-react';
import { useTheme } from './ThemeContext';

const About = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const profileData = [
    { label: 'NAME', value: 'SHREYAS R A', icon: User, color: 'cyan' },
    { label: 'ROLE', value: 'MERN Full Stack Developer & 3D Web Engineer', icon: Terminal, color: 'purple' },
    { label: 'EDUCATION', value: 'BCA (Graduated 2025) / MCA (In Progress)', icon: GraduationCap, color: 'cyan' },
    { label: 'LOCATION', value: 'Mangalore, India', icon: Globe, color: 'purple' },
    { label: 'EXPERIENCE', value: 'Software Applications & Systems Developer', icon: Briefcase, color: 'cyan' },
    { label: 'CURRENT STATUS', value: 'ONLINE // OPEN FOR OPPORTUNITIES', icon: ShieldCheck, color: 'green' },
  ];

  return (
    <section className="relative flex flex-col justify-center bg-transparent py-24 min-h-screen overflow-hidden">
      {/* Ambient background glows */}
      <div className={`absolute top-0 right-0 w-[450px] h-[450px] blur-[130px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-purple/10' : 'bg-pink-300/20'}`} />
      <div className={`absolute bottom-0 left-0 w-[450px] h-[450px] blur-[130px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-cyan/10' : 'bg-blue-300/20'}`} />

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${
            isDark ? 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple' : 'bg-pink-50 border-pink-200 text-pink-600'
          }`}>
            <User className="w-4 h-4" />
            <span className="font-orbitron text-xs tracking-widest font-bold">USER_PROFILE_DB</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            SHREYAS RA
          </h2>
          <div className={`w-28 h-1 mx-auto ${isDark ? 'bg-neon-cyan box-glow-cyan' : 'bg-blue-500'}`} />
        </motion.div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* Left Column: Profile Database Cards (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 h-full flex flex-col justify-center"
            >
              <div className={`flex items-center gap-2 mb-2 px-1 font-mono text-xs tracking-widest ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>
                <span>[ SECURE_QUERY: PROFILE_TABLE ]</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {profileData.map((item) => {
                  const ItemIcon = item.icon;
                  const isGreen = item.color === 'green';
                  const isPurple = item.color === 'purple';
                  
                  return (
                    <div
                      key={item.label}
                      className={`p-5 rounded-xl border relative overflow-hidden transition-all duration-300 group hover:scale-[1.02] ${
                        isDark 
                          ? `glass-panel border-white/10 ${
                              isGreen ? 'hover:border-green-500/50 hover:shadow-[0_0_15px_rgba(34,197,94,0.15)]' :
                              isPurple ? 'hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(188,19,254,0.15)]' :
                              'hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]'
                            }`
                          : 'bg-white shadow-md border-gray-200 hover:shadow-lg hover:border-blue-500'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {/* Corner Brackets */}
                      <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${isDark ? 'border-white/20' : 'border-gray-300'}`} />
                      
                      <div className="flex gap-4 items-start relative z-10">
                        <div className={`p-3 rounded-lg border transition-colors duration-300 ${
                          isDark 
                            ? isGreen ? 'bg-green-500/10 border-green-500/30 text-green-400' :
                              isPurple ? 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple' :
                              'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan'
                            : 'bg-blue-50 border-blue-200 text-blue-600'
                        }`}>
                          <ItemIcon className="w-5 h-5" />
                        </div>
                        
                        <div className="space-y-1">
                          <span className={`block font-orbitron text-[10px] tracking-widest ${
                            isDark ? 'text-gray-500' : 'text-gray-400'
                          }`}>
                            {item.label}
                          </span>
                          <span className={`block font-rajdhani font-bold text-sm md:text-base leading-snug ${
                            isDark 
                              ? isGreen ? 'text-green-400 text-glow' :
                                isPurple ? 'text-neon-purple' :
                                'text-white'
                              : 'text-gray-900'
                          }`}>
                            {item.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Right Column: Bio Window + CTAs (5 cols) */}
          <div className="lg:col-span-5 flex flex-col">
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`p-5 sm:p-8 md:p-10 rounded-2xl flex flex-col h-full border ${
                isDark ? 'glass-panel border-white/10 box-glow shadow-[0_0_20px_rgba(0,255,255,0.02)]' : 'bg-white shadow-lg border-gray-200'
              }`}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 0 100%)'
              }}
            >
              {/* Corner decors */}
              <div className={`absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 ${isDark ? 'border-neon-cyan/30' : 'border-blue-500/30'}`} />
              
              <div className="flex items-center gap-2 mb-6 border-b border-white/10 pb-4">
                <Info className={`w-5 h-5 ${isDark ? 'text-neon-cyan animate-pulse' : 'text-blue-600'}`} />
                <h4 className={`text-sm sm:text-base md:text-xl font-orbitron font-bold tracking-wider sm:tracking-widest ${isDark ? 'text-white text-glow-cyan' : 'text-gray-900'}`}>
                  OPERATOR_LOG_PAYLOAD
                </h4>
              </div>

              <div className="space-y-6 flex-grow font-rajdhani text-base md:text-lg leading-relaxed text-justify">
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  I am a passionate and dedicated <span className={`font-bold ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>MERN Full Stack Developer</span> based in <span className={isDark ? "text-neon-cyan text-glow-cyan" : "text-blue-600 font-bold"}>Mangalore</span>, focused on building high-performance, responsive, and visually stunning web systems. I specialize in turning complex designs into sleek, interactive user interfaces that provide immersive user experiences while ensuring robust backend architecture.
                </p>
                <p className={isDark ? 'text-gray-300' : 'text-gray-700'}>
                  With a strong foundation in <span className="font-semibold text-glow-purple">C, Python, and Java</span>, I bridge the gap between heavy backend logic and the browser using modern tools like <span className={`font-semibold ${isDark ? 'text-white' : 'text-black'}`}>MongoDB, Express, React, Node.js, and Tailwind CSS</span>. I believe in clean code, continuous learning, and pushing the boundaries of modern web design.
                </p>
              </div>
              
              {/* Resume Trigger Controls */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10">
                <a 
                  href="./shreyas.pdf" 
                  download
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded font-orbitron text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 hover:scale-[1.03] ${
                    isDark 
                      ? 'bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]' 
                      : 'bg-blue-600 text-white shadow-md hover:bg-blue-700'
                  }`}
                >
                  <Download className="w-4 h-4"/>
                  <span>DOWNLOAD RESUME</span>
                </a>
                
                <a 
                  href="./shreyas.pdf" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded border font-orbitron text-xs sm:text-sm font-bold tracking-widest transition-all duration-300 hover:scale-[1.03] ${
                    isDark 
                      ? 'bg-neon-purple/10 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_20px_rgba(188,19,254,0.4)]' 
                      : 'bg-white border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white'
                  }`}
                >
                  <Eye className="w-4 h-4"/>
                  <span>VIEW RESUME</span>
                </a>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default About;
