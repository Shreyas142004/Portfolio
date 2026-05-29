import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { BookOpen, GraduationCap, Award } from 'lucide-react';
import { useTheme } from './ThemeContext';

const academicsData = [
  {
    id: 1,
    degree: 'Master of Computer Applications (MCA)',
    status: 'Mission Not Completed',
    score: '8.61 CGPA',
    description: 'Advanced studies in computer applications, software engineering, and modern web technologies.',
    icon: <GraduationCap className="w-5 h-5" />
  },
  {
    id: 2,
    degree: 'Bachelor of Computer Applications (BCA)',
    status: 'Mission Completed 2025',
    score: '7.6 CGPA',
    description: 'Foundational degree covering programming, databases, and core computer science concepts.',
    icon: <BookOpen className="w-5 h-5" />
  },
  {
    id: 3,
    degree: 'Pre-University Course (PUC)',
    status: 'Mission Completed 2022',
    score: '79.83%',
    description: 'Pre-university education with a focus on core sciences and mathematics.',
    icon: <Award className="w-5 h-5" />
  },
  {
    id: 4,
    degree: 'Secondary School Leaving Certificate (SSLC)',
    status: 'Mission Completed 2020',
    score: '76.8%',
    description: 'High school foundational education.',
    icon: <Award className="w-5 h-5" />
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
    <section className="py-24 relative min-h-screen bg-transparent">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-neon-purple' : 'text-pink-600'}>&gt;</span> ACADEMIC_LOGS
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-cyan box-glow' : 'bg-blue-500'}`} />
        </motion.div>

        <div className="relative" ref={timelineRef}>
          {/* Main Timeline Line */}
          <div className={`absolute left-4 md:left-1/2 top-0 bottom-0 w-1 transform md:-translate-x-1/2 ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <motion.div 
              style={{ height: lineHeight }}
              className={`w-full ${isDark ? 'bg-neon-cyan shadow-[0_0_15px_#00ffff]' : 'bg-blue-600'}`}
            />
          </div>

          <div className="space-y-12">
            {academicsData.map((item, index) => (
              <div key={item.id} className={`relative flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                
                {/* Node Icon */}
                <div className={`absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center w-10 h-10 md:w-12 md:h-12 rounded-full border-2 z-10 ${
                  isDark ? 'bg-black border-neon-cyan box-glow text-neon-cyan' : 'bg-white border-blue-500 text-blue-600'
                }`}>
                  {item.icon}
                </div>

                {/* Content Card */}
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
                  className={`w-full md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pl-12' : 'md:pr-12 text-left md:text-right'}`}
                >
                  <div className={`p-6 rounded-xl border transition-colors ${
                    isDark
                      ? 'glass-panel border-neon-purple/30 hover:border-neon-cyan/50'
                      : 'bg-white shadow-md border-pink-200 hover:border-blue-400'
                  }`}>
                    <span className={`inline-block px-3 py-1 text-xs font-orbitron rounded mb-4 ${
                      isDark ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {item.status}
                    </span>
                    <h3 className={`text-xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{item.degree}</h3>
                    
                    <div className={`inline-block px-3 py-1 mb-4 border rounded ${isDark ? 'border-neon-purple/50 text-neon-purple bg-neon-purple/5' : 'border-pink-300 text-pink-600 bg-pink-50'}`}>
                      <span className="font-rajdhani font-bold tracking-wider">SCORE: {item.score}</span>
                    </div>

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

export default Academics;
