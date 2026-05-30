import { useState, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Code, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

const projectsData = [
  {
    id: 1,
    title: 'ATM System',
    category: 'C Programming',
    image: './c project.png',
    shortDescription: 'A complete ATM simulation project developed purely in C.',
    fullDescription: 'This project simulates the core functionalities of an Automated Teller Machine (ATM). Developed entirely in C, it features a command-line interface that allows users to perform standard banking operations such as checking balances, withdrawing cash, and depositing funds. It focuses on robust logic, state management, and basic file I/O for persistent data.',
    tech: ['C Programming', 'CLI', 'Data Structures'],
    link: 'https://github.com/Shreyas142004/ATM-simulation-C.git',
    github: 'https://github.com/Shreyas142004/ATM-simulation-C.git'
  },
  {
    id: 2,
    title: 'Smart Utility Portal',
    category: 'Web Development',
    image: './web project.png',
    shortDescription: 'Modern responsive frontend for a smart utility application.',
    fullDescription: 'A fully responsive and interactive frontend dashboard built for a smart utility system. Developed using React and styled with Tailwind CSS, it features a modern, clean UI designed to display complex utility metrics clearly. Focuses heavily on component reusability and sleek design aesthetics.',
    tech: ['React', 'Tailwind CSS', 'Vite'],
    link: 'https://github.com/Shreyas142004/Smart-Utility-Portal.git',
    github: 'https://github.com/Shreyas142004/Smart-Utility-Portal.git'
  },
  {
    id: 3,
    title: 'AI Speech-to-Text',
    category: 'Machine Learning',
    image: './speech.png',
    shortDescription: '⚠️ MODULE LOCKED: Neural pathways currently under construction...',
    fullDescription: '>>> SYSTEM OVERRIDE: ACCESS RESTRICTED <<<\n\nThe neural network for this AI-powered speech transcription tool is currently being forged in the core mainframe. Our synthetic engineers are calibrating the OpenAI Whisper algorithms for maximum efficiency.\n\nETA: UNKNOWN.\n\nSTAND BY FOR NEXT TRANSMISSION...',
    tech: ['CLASSIFIED', 'IN DEVELOPMENT'],
    link: '#',
    github: '#'
  }
];

import { useSpring, useTransform } from 'framer-motion';

const ProjectCard = ({ project, index, isDark, onClick }) => {
  const cardRef = useRef(null);
  
  // Hover glow effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // For the glow effect
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    
    // Only apply 3D tilt on desktop screens
    if (window.innerWidth >= 1024) {
      const width = rect.width;
      const height = rect.height;
      const mouseXNorm = (e.clientX - rect.left) / width - 0.5;
      const mouseYNorm = (e.clientY - rect.top) / height - 0.5;
      x.set(mouseXNorm);
      y.set(mouseYNorm);
    }
  }

  function handleMouseLeave() {
    // Reset tilt on leave
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="w-full h-full cursor-pointer group perspective-1000"
      onClick={() => onClick(project)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={window.matchMedia("(hover: hover)").matches ? { scale: 1.03 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={window.innerWidth >= 1024 ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        className={`rounded-xl overflow-hidden transition-colors duration-300 relative border w-full h-full flex flex-col ${
          isDark 
            ? 'glass-panel border-white/10 group-hover:border-neon-cyan/50' 
            : 'bg-white shadow-lg border-gray-200 group-hover:border-blue-500'
        }`}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-30"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                300px circle at ${mouseX}px ${mouseY}px,
                ${isDark ? 'rgba(0, 255, 255, 0.15)' : 'rgba(37, 99, 235, 0.1)'},
                transparent 80%
              )
            `,
          }}
        />

        {/* Image Container */}
        <div className="h-48 overflow-hidden relative lg:[transform:translateZ(30px)]">
          <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 mix-blend-overlay ${isDark ? 'bg-neon-cyan/20' : 'bg-blue-500/20'}`} />
          <img 
            src={project.image} 
            alt={project.title} 
            className={`w-full h-full object-cover transition-all duration-700 ${isDark ? 'grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110' : 'group-hover:scale-110'}`}
          />
        </div>
        
        {/* Content */}
        <div className={`p-6 relative z-20 backdrop-blur-sm flex-1 flex flex-col lg:[transform:translateZ(40px)] ${isDark ? 'bg-black/80' : 'bg-white/90'}`}>
          <p className={`font-rajdhani text-sm font-bold tracking-widest mb-1 ${isDark ? 'text-neon-purple' : 'text-pink-600'}`}>{project.category}</p>
          <h3 className={`text-xl font-orbitron font-bold mb-3 transition-all ${isDark ? 'text-white group-hover:text-glow' : 'text-gray-900 group-hover:text-blue-600'}`}>{project.title}</h3>
          
          <p className={`font-rajdhani text-sm mb-6 flex-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {project.shortDescription}
          </p>

          <div className="flex justify-between items-center mt-auto">
            <span className={`text-xs font-orbitron font-bold uppercase tracking-wider ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>Click for details</span>
            
            <a 
              href={project.github} 
              target="_blank" 
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()} 
              className={`relative z-50 p-2 rounded-full border transition-colors ${isDark ? 'border-white/20 text-white hover:text-neon-cyan hover:border-neon-cyan' : 'border-gray-300 text-gray-800 hover:text-blue-600 hover:border-blue-600'}`}
            >
              <Code className="w-4 h-4" />
            </a>
          </div>
        </div>
        
        {/* Animated Border Bottom */}
        <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-500 z-20 lg:[transform:translateZ(50px)] ${isDark ? 'bg-neon-cyan shadow-[0_0_10px_#00ffff]' : 'bg-blue-600'}`} />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="projects" className="py-24 relative min-h-screen overflow-hidden bg-transparent">
      {/* Background Decor */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-[600px] blur-[150px] pointer-events-none ${isDark ? 'bg-neon-purple/5' : 'bg-blue-300/10'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-neon-cyan' : 'text-blue-600'}>&gt;</span> ARCHIVE_LOGS
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-purple box-glow' : 'bg-pink-500'}`} />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          {projectsData.map((project, index) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              index={index} 
              isDark={isDark} 
              onClick={setSelectedProject} 
            />
          ))}
        </div>
      </div>

      {/* Modal for detailed description */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm ${isDark ? 'bg-black/50' : 'bg-white/50'}`}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-xl w-full max-h-[90vh] overflow-y-auto overflow-x-hidden rounded-2xl border relative ${
                isDark ? 'glass-panel border-neon-cyan/40 box-glow' : 'bg-white border-gray-200 shadow-2xl'
              }`}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 z-50 p-2 rounded-full backdrop-blur-sm transition-colors ${
                  isDark ? 'text-white/50 hover:text-neon-cyan bg-black/50' : 'text-gray-500 hover:text-blue-600 bg-white/80'
                }`}
              >
                <X className="w-5 h-5" />
              </button>

              <div className="h-48 md:h-56 relative">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-black via-black/50' : 'from-white via-white/50'} to-transparent`} />
                <div className="absolute bottom-5 left-5 right-5">
                  <p className={`font-rajdhani font-bold tracking-widest mb-1 ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>{selectedProject.category}</p>
                  <h3 className={`text-2xl md:text-3xl font-orbitron font-bold ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>{selectedProject.title}</h3>
                </div>
              </div>

              <div className={`p-5 md:p-6 ${isDark ? 'bg-black/80' : 'bg-white'}`}>
                <p className={`font-rajdhani text-base leading-relaxed mb-5 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {selectedProject.fullDescription}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                  {selectedProject.tech.map((t) => (
                    <span key={t} className={`px-3 py-1 text-sm font-orbitron rounded border ${
                      isDark 
                        ? 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple' 
                        : 'bg-pink-50 border-pink-200 text-pink-600'
                    }`}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  {selectedProject.github !== '#' ? (
                    <a href={selectedProject.github} target="_blank" rel="noreferrer" className={`flex items-center gap-2 px-6 py-3 font-orbitron font-bold rounded border transition-all ${
                      isDark
                        ? 'bg-transparent border-white/30 text-white hover:border-white'
                        : 'bg-transparent border-gray-300 text-gray-800 hover:border-gray-600'
                    }`}>
                      <Code className="w-5 h-5" /> GitHub Repo
                    </a>
                  ) : (
                    <div className={`flex items-center gap-2 px-6 py-3 font-orbitron font-bold rounded border cursor-not-allowed opacity-50 ${
                      isDark
                        ? 'bg-red-900/20 border-red-500/50 text-red-500'
                        : 'bg-red-50 border-red-300 text-red-600'
                    }`}>
                      <X className="w-5 h-5" /> REPO LOCKED
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
