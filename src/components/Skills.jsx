import { useRef } from 'react';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useTheme } from './ThemeContext';

const skillsDataDark = [
  { name: 'C', level: 75, color: '#00ffff' },
  { name: 'Python', level: 60, color: '#bc13fe' },
  { name: 'Java', level: 75, color: '#00f3ff' },
  { name: 'React', level: 60, color: '#bc13fe' },
  { name: 'Tailwind CSS', level: 60, color: '#00ffff' },
];

const skillsDataLight = [
  { name: 'C', level: 75, color: '#2563eb' },
  { name: 'Python', level: 60, color: '#db2777' },
  { name: 'Java', level: 75, color: '#2563eb' },
  { name: 'React', level: 60, color: '#db2777' },
  { name: 'Tailwind CSS', level: 60, color: '#2563eb' },
];

const SkillCard = ({ skill, index, isDark }) => {
  const cardRef = useRef(null);
  
  // Hover glow effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Set glow coordinates
    mouseX.set(x);
    mouseY.set(y);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`relative group rounded-xl border p-6 overflow-hidden transition-colors w-full h-full ${
          isDark 
            ? 'bg-black/40 border-white/10 hover:border-neon-cyan/50' 
            : 'bg-white border-gray-200 hover:border-blue-500 shadow-sm hover:shadow-md'
        }`}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                ${skill.color}20,
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Card Content shifted slightly forward in Z-space for 3D effect */}
        <div style={{ transform: "translateZ(30px)" }}>
          <div className="relative z-10 flex justify-between items-center mb-4">
            <h4 className={`font-orbitron font-bold tracking-wider ${isDark ? 'text-white' : 'text-gray-900'}`}>{skill.name}</h4>
            <span className={`font-rajdhani ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>{skill.level}%</span>
          </div>
          <div className={`relative z-10 w-full h-2 rounded-full overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-gray-200'}`}>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 0.5 + index * 0.1, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ 
                backgroundColor: skill.color,
                boxShadow: isDark ? `0 0 10px ${skill.color}` : 'none'
              }}
            />
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const skillsData = isDark ? skillsDataDark : skillsDataLight;

  return (
    <section className="py-24 relative min-h-screen bg-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 pt-10"
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-neon-purple' : 'text-pink-600'}>&gt;</span> SKILL_MODULES
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-cyan box-glow' : 'bg-blue-500'}`} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {skillsData.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} isDark={isDark} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
