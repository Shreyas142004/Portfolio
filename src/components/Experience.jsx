import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { useTheme } from './ThemeContext';

const experienceData = [
  {
    id: 1,
    type: 'work',
    role: 'Senior 3D Frontend Engineer',
    company: 'Cyberdyne Systems',
    period: '2077 - Present',
    description: 'Lead developer for holographic interfaces and WebGL-based neural dashboard monitoring systems.',
  },
  {
    id: 2,
    type: 'work',
    role: 'UI/UX Developer',
    company: 'Neon Corp',
    period: '2074 - 2077',
    description: 'Designed and implemented high-performance trading terminals with real-time data visualization.',
  },
  {
    id: 3,
    type: 'education',
    role: 'M.S. Cybernetics & Computer Science',
    company: 'Neo-Tokyo Institute of Technology',
    period: '2072 - 2074',
    description: 'Specialized in AI-driven interfaces and procedural 3D generation.',
  }
];

const Experience = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative min-h-screen bg-transparent" ref={containerRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-neon-purple' : 'text-pink-600'}>&gt;</span> MISSION_LOGS
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-cyan box-glow' : 'bg-blue-500'}`} />
        </motion.div>

        <div className="relative">
          {/* Main Timeline Line */}
          <div className={`absolute left-8 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <motion.div 
              style={{ height: lineHeight }}
              className={`w-full ${isDark ? 'bg-neon-cyan shadow-[0_0_15px_#00ffff]' : 'bg-blue-600'}`}
            />
          </div>

          <div className="space-y-12">
            {experienceData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Node Icon */}
                <div className={`absolute left-8 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border-2 z-10 ${
                  isDark ? 'bg-black border-neon-cyan box-glow' : 'bg-white border-blue-500'
                }`}>
                  {item.type === 'work' ? (
                    <Briefcase className={`w-5 h-5 ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`} />
                  ) : (
                    <GraduationCap className={`w-5 h-5 ${isDark ? 'text-neon-purple' : 'text-pink-600'}`} />
                  )}
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`w-full md:w-1/2 pl-24 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}
                >
                  <div className={`p-6 rounded-xl border transition-colors ${
                    isDark
                      ? `glass-panel ${item.type === 'work' ? 'border-neon-cyan/30' : 'border-neon-purple/30'} hover:border-white/50`
                      : `bg-white shadow-md ${item.type === 'work' ? 'border-blue-200' : 'border-pink-200'} hover:border-gray-400`
                  }`}>
                    <span className={`inline-block px-3 py-1 text-xs font-orbitron rounded mb-4 ${
                      item.type === 'work' 
                        ? isDark ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-blue-50 text-blue-600'
                        : isDark ? 'bg-neon-purple/10 text-neon-purple' : 'bg-pink-50 text-pink-600'
                    }`}>
                      {item.period}
                    </span>
                    <h3 className={`text-xl font-orbitron font-bold mb-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.role}</h3>
                    <h4 className={`font-rajdhani text-lg mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{item.company}</h4>
                    <p className={`font-rajdhani leading-relaxed ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      {item.description}
                    </p>
                  </div>
                </motion.div>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
