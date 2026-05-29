import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Leaf, 
  Mountain, 
  Code2, 
  FileCode2, 
  Database, 
  Braces, 
  TerminalSquare, 
  GitBranch, 
  LayoutTemplate,
  MonitorSmartphone,
  Cpu
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const webSkills = [
  { 
    name: 'JavaScript', 
    level: 85, 
    icon: FileCode2,
    desc: 'Dynamic DOM engines, Canvas animation vectors, and ES6 applications.' 
  },
  { 
    name: 'HTML5 & CSS3', 
    level: 90, 
    icon: LayoutTemplate,
    desc: 'Semantic layouts, responsive flexbox/grid structures, and custom typography.' 
  },
  { 
    name: 'React', 
    level: 60, 
    icon: Code2,
    desc: 'Component-based UI architectures, state management, and modern hooks.' 
  },
  { 
    name: 'Tailwind CSS', 
    level: 60, 
    icon: MonitorSmartphone,
    desc: 'Utility-first styling, rapid UI development, and responsive design.' 
  },
  { 
    name: 'Git & GitHub', 
    level: 75, 
    icon: GitBranch,
    desc: 'Version control workflows, repository management, and branches structure.' 
  }
];

const coreSkills = [
  { 
    name: 'Java', 
    level: 75, 
    icon: Code2,
    desc: 'Object-Oriented design patterns, abstract class hierarchy, and robust program flows.' 
  },
  { 
    name: 'MySQL', 
    level: 80, 
    icon: Database,
    desc: 'Database schema construction, queries execution, table relationships mapping.' 
  },
  { 
    name: 'Python', 
    level: 60, 
    icon: Braces,
    desc: 'Scripting files, data processing, and automation.' 
  },
  { 
    name: 'C Programming', 
    level: 75, 
    icon: TerminalSquare,
    desc: 'CLI modular systems, persistent file management inputs, account ledgers.' 
  }
];

const CyberSkillBar = ({ skill, index, isDark, isOpen, onToggle }) => {
  const Icon = skill.icon;
  
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onClick={onToggle}
      className={`relative p-4 mb-4 rounded-r-xl border-l-4 transition-all duration-300 cursor-pointer ${
        isDark 
          ? 'bg-black/60 border-neon-cyan hover:bg-neon-cyan/10 hover:shadow-[0_0_15px_rgba(0,255,255,0.15)]' 
          : 'bg-white/60 border-blue-600 hover:bg-blue-50 hover:shadow-md'
      }`}
    >
      {/* Always visible: Icon and Name */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg transition-colors duration-300 ${
            isDark 
              ? (isOpen ? 'bg-neon-cyan text-black' : 'bg-gray-800 text-neon-cyan')
              : (isOpen ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-600')
          }`}>
            <Icon className="w-5 h-5" />
          </div>
          <span className={`font-orbitron font-bold tracking-wider text-lg ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {skill.name}
          </span>
        </div>
        
        {/* Helper arrow indicating expansion */}
        <motion.div 
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className={`text-sm ${isDark ? 'text-gray-500' : 'text-gray-400'}`}
        >
          ▼
        </motion.div>
      </div>

      {/* Expandable Content (Percentage, Bar, Description) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="pt-5 pb-2">
              <div className="flex justify-end mb-2">
                <div className={`font-rajdhani font-bold text-xl ${isDark ? 'text-neon-purple text-glow-purple' : 'text-pink-600'}`}>
                  {skill.level}<span className="text-sm text-gray-500">%</span>
                </div>
              </div>

              {/* Cyberpunk Progress Bar */}
              <div className="relative w-full h-2 bg-gray-800 rounded-full overflow-hidden mb-3">
                <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTEwIDBMMCAwaDB2MTBoMTBWMHoiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iMSIvPjwvc3ZnPg==')] mix-blend-overlay" />
                
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${skill.level}%` }}
                  transition={{ duration: 1, ease: "circOut", delay: 0.1 }}
                  className={`relative h-full ${
                    isDark 
                      ? 'bg-gradient-to-r from-neon-purple to-neon-cyan' 
                      : 'bg-gradient-to-r from-pink-500 to-blue-500'
                  }`}
                >
                  <motion.div 
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                    className={`absolute right-0 top-0 bottom-0 w-4 blur-[4px] ${isDark ? 'bg-white' : 'bg-blue-200'}`}
                  />
                </motion.div>
              </div>

              {/* Description */}
              <p className={`font-rajdhani text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className={isDark ? 'text-neon-cyan/50' : 'text-blue-400'}>&gt;_ </span>
                {skill.desc}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative corners */}
      <div className={`absolute top-0 right-0 w-2 h-2 border-t border-r ${isDark ? 'border-neon-cyan/30' : 'border-blue-300'}`} />
      <div className={`absolute bottom-0 right-0 w-2 h-2 border-b border-r ${isDark ? 'border-neon-cyan/30' : 'border-blue-300'}`} />
    </motion.div>
  );
};

const HUDPanel = ({ title, icon: Icon, skills, isDark, panelId }) => {
  const [activeSkill, setActiveSkill] = useState(null);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className={`relative w-full overflow-hidden ${
        isDark 
          ? 'bg-[#050505]/90 border border-gray-800 shadow-[0_0_30px_rgba(0,0,0,0.8)]' 
          : 'bg-white/80 border border-gray-200 shadow-xl'
      } backdrop-blur-xl`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 30px 100%, 0 calc(100% - 30px))'
      }}
    >
      {/* Top decorative bar */}
      <div className={`h-1 w-full ${isDark ? 'bg-gradient-to-r from-neon-purple via-neon-cyan to-transparent' : 'bg-gradient-to-r from-pink-500 via-blue-500 to-transparent'}`} />
      
      <div className="p-6 md:p-8">
        {/* Panel Header */}
        <div className="flex justify-between items-start mb-10">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-tr-xl rounded-bl-xl border ${isDark ? 'bg-gray-900 border-neon-cyan/50 text-neon-cyan shadow-[0_0_15px_rgba(0,255,255,0.2)]' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
              <Icon className="w-8 h-8" />
            </div>
            <div>
              <h3 className={`text-2xl font-orbitron font-bold tracking-widest uppercase ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {title}
              </h3>
              <p className={`font-rajdhani text-sm ${isDark ? 'text-neon-purple' : 'text-pink-500'}`}>
                SYSTEM_NODE // {panelId}
              </p>
            </div>
          </div>
          
          {/* Decorative HUD Elements */}
          <div className="hidden sm:flex flex-col items-end gap-1 opacity-50">
            <div className={`w-16 h-1 ${isDark ? 'bg-neon-cyan' : 'bg-blue-500'}`} />
            <div className={`w-12 h-1 ${isDark ? 'bg-neon-purple' : 'bg-pink-500'}`} />
            <div className={`w-8 h-1 ${isDark ? 'bg-gray-500' : 'bg-gray-300'}`} />
          </div>
        </div>

        {/* Skills Container */}
        <div className="space-y-2">
          {skills.map((skill, index) => (
            <CyberSkillBar 
              key={skill.name} 
              skill={skill} 
              index={index} 
              isDark={isDark} 
              isOpen={activeSkill === skill.name}
              onToggle={() => setActiveSkill(activeSkill === skill.name ? null : skill.name)}
            />
          ))}
        </div>
      </div>
      
      {/* Background Cyber Grid */}
      <div className={`absolute inset-0 pointer-events-none opacity-[0.03] z-[-1] ${isDark ? 'bg-white' : 'bg-black'}`}
        style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '24px 24px' }} 
      />
    </motion.div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className="py-24 relative min-h-screen overflow-hidden bg-transparent flex flex-col justify-center">
      {/* Background Orbs */}
      <div className={`absolute top-1/4 -left-64 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isDark ? 'bg-neon-purple/20' : 'bg-pink-300/30'}`} />
      <div className={`absolute bottom-1/4 -right-64 w-96 h-96 blur-[120px] rounded-full pointer-events-none ${isDark ? 'bg-neon-cyan/10' : 'bg-blue-300/30'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center mb-16 pt-10"
        >
          <div className={`inline-flex items-center gap-3 px-4 py-2 rounded-full border mb-6 ${isDark ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
            <Cpu className="w-5 h-5" />
            <span className="font-orbitron text-sm tracking-widest font-bold">CAPABILITY_MATRIX</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 text-center ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            TECHNICAL ARSENAL
          </h2>
          <div className="flex gap-2">
            <div className={`w-12 h-1 ${isDark ? 'bg-neon-purple' : 'bg-pink-500'}`} />
            <div className={`w-12 h-1 ${isDark ? 'bg-neon-cyan' : 'bg-blue-500'}`} />
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 perspective-1000">
          <HUDPanel 
            title="Web Dev" 
            icon={Leaf} 
            skills={webSkills} 
            isDark={isDark}
            panelId="FRONT_END_01" 
          />
          <HUDPanel 
            title="Core Code" 
            icon={Mountain} 
            skills={coreSkills} 
            isDark={isDark}
            panelId="BACK_END_02" 
          />
        </div>

      </div>
    </section>
  );
};

export default Skills;
