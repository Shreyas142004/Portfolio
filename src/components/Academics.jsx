import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, GraduationCap, Award, Calendar, Activity } from 'lucide-react';
import { useTheme } from './ThemeContext';

const chronologyData = [
  {
    id: 1,
    type: 'education',
    role: 'Master of Computer Applications (MCA)',
    institution: 'VTU Affiliated Institution',
    period: '2025 - Present',
    score: '8.61 CGPA',
    status: 'MISSION IN PROGRESS',
    description: 'Advanced studies in computer applications, database design, software engineering, and modern web architectures.',
    icon: <GraduationCap className="w-5 h-5" />,
    color: 'purple'
  },
  {
    id: 2,
    type: 'education',
    role: 'Bachelor of Computer Applications (BCA)',
    institution: 'Mangalore University',
    period: '2022 - 2025',
    score: '7.6 CGPA',
    status: 'MISSION COMPLETED 2025',
    description: 'Foundational degree covering object-oriented programming, databases, web development, and core computer science.',
    icon: <BookOpen className="w-5 h-5" />,
    color: 'purple'
  },
  {
    id: 3,
    type: 'education',
    role: 'Pre-University Course (PUC)',
    institution: 'State Pre-University Board',
    period: '2020 - 2022',
    score: '79.83%',
    status: 'MISSION COMPLETED 2022',
    description: 'Pre-university education with a focus on core physics, chemistry, mathematics, and computer science.',
    icon: <Award className="w-5 h-5" />,
    color: 'purple'
  },
  {
    id: 4,
    type: 'education',
    role: 'Secondary School Leaving Certificate (SSLC)',
    institution: 'State Education Board',
    period: '2020',
    score: '76.8%',
    status: 'MISSION COMPLETED 2020',
    description: 'High school foundational education laying the groundwork for science and mathematics focus.',
    icon: <Award className="w-5 h-5" />,
    color: 'purple'
  }
];

const Academics = () => {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section className="py-24 relative min-h-screen overflow-hidden bg-transparent">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1] cyber-grid-bg" />
      <div className={`absolute top-1/4 right-0 w-[400px] h-[400px] blur-[120px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-purple/5' : 'bg-pink-300/10'}`} />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Section title header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${
            isDark ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Activity className="w-4 h-4 animate-pulse" />
            <span className="font-orbitron text-xs tracking-widest font-bold font-mono">SYS_CHRONOLOGY</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            MISSION CHRONOLOGY
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-purple box-glow' : 'bg-pink-500'}`} />
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Main Timeline Connector Line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 ${
            isDark ? 'bg-gray-900' : 'bg-gray-200'
          }`}>
            <motion.div 
              style={{ height: lineHeight }}
              className={`w-full origin-top ${isDark ? 'bg-gradient-to-b from-neon-cyan to-neon-purple shadow-[0_0_15px_#00ffff]' : 'bg-blue-600'}`}
            />
          </div>

          <div className="space-y-16">
            {chronologyData.map((item, index) => {
              const isWork = item.type === 'work';
              const isPurple = item.color === 'purple';
              
              return (
                <div 
                  key={item.id} 
                  className={`relative flex flex-col md:flex-row items-center ${
                    index % 2 === 0 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Node Circle Icon */}
                  <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 z-10 transition-colors duration-300 ${
                    isDark 
                      ? isPurple 
                        ? 'bg-black border-neon-purple text-neon-purple hover:bg-neon-purple/20 shadow-[0_0_10px_rgba(188,19,254,0.4)]'
                        : 'bg-black border-neon-cyan text-neon-cyan hover:bg-neon-cyan/20 shadow-[0_0_10px_rgba(0,255,255,0.4)]'
                      : 'bg-white border-blue-500 text-blue-600'
                  }`}>
                    {item.icon}
                  </div>

                  {/* Card Block */}
                  <motion.div
                    initial={{ opacity: 0, x: index % 2 === 0 ? 60 : -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, type: "spring", bounce: 0.25 }}
                    className={`w-full md:w-1/2 pl-12 md:pl-0 ${
                      index % 2 === 0 ? 'md:pl-14' : 'md:pr-14 text-left md:text-right'
                    }`}
                  >
                    <div 
                      className={`p-6 rounded-xl border transition-all duration-300 hover:scale-[1.02] relative overflow-hidden ${
                        isDark
                          ? isPurple
                            ? 'glass-panel border-neon-purple/25 hover:border-neon-purple/50 hover:shadow-[0_0_20px_rgba(188,19,254,0.1)]'
                            : 'glass-panel border-neon-cyan/25 hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.1)]'
                          : 'bg-white shadow-md border-gray-200 hover:shadow-xl'
                      }`}
                      style={{
                        clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%)'
                      }}
                    >
                      {/* Corner decoration tag */}
                      <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${
                        isDark ? isPurple ? 'border-neon-purple/50' : 'border-neon-cyan/50' : 'border-gray-300'
                      }`} />

                      {/* Header row */}
                      <div className={`flex flex-wrap items-center gap-2 mb-4 ${
                        index % 2 === 0 ? '' : 'md:justify-end'
                      }`}>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-mono rounded ${
                          isDark 
                            ? isWork 
                              ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/20' 
                              : 'bg-neon-purple/10 text-neon-purple border border-neon-purple/20'
                            : 'bg-blue-50 text-blue-600 border border-blue-100'
                        }`}>
                          <Calendar className="w-3 h-3" />
                          {item.period}
                        </span>
                        
                        <span className={`inline-block px-2.5 py-0.5 text-[9px] font-orbitron border rounded ${
                          isDark 
                            ? 'border-white/10 text-gray-400 bg-white/5' 
                            : 'border-gray-200 text-gray-500 bg-gray-50'
                        }`}>
                          {item.status}
                        </span>
                      </div>

                      <h3 className={`text-xl font-orbitron font-bold mb-1 ${
                        isDark ? 'text-white' : 'text-gray-900'
                      }`}>
                        {item.role}
                      </h3>
                      
                      <h4 className={`font-rajdhani font-semibold text-base mb-3 ${
                        isDark 
                          ? isPurple ? 'text-neon-purple' : 'text-neon-cyan' 
                          : 'text-blue-600'
                      }`}>
                        {item.institution}
                      </h4>
                      
                      {item.score && (
                        <div className={`inline-block px-2.5 py-1 mb-4 rounded border text-xs font-mono font-bold ${
                          isDark 
                            ? 'border-neon-cyan/25 text-neon-cyan bg-neon-cyan/5' 
                            : 'border-blue-200 text-blue-600 bg-blue-50'
                        }`}>
                          SCORE: {item.score}
                        </div>
                      )}

                      <p className={`font-rajdhani text-sm leading-relaxed ${
                        isDark ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Academics;
