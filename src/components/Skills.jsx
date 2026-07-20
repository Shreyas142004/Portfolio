import { 
  Code2, 
  LayoutTemplate, 
  MonitorSmartphone, 
  FileCode2, 
  Cpu, 
  Layers, 
  Braces, 
  TerminalSquare, 
  Database, 
  Brain, 
  Sparkles, 
  GitBranch, 
  Cloud 
} from 'lucide-react';
import { useTheme } from './ThemeContext';

const webSkills = {
  title: "WEB DEV & UTILITIES",
  icon: LayoutTemplate,
  panelId: "SYS_FE_MATRIX",
  skills: [
    { name: 'JavaScript', icon: FileCode2, desc: 'Dynamic DOM engines, Canvas animation vectors, and ES6 applications.' },
    { name: 'HTML5 & CSS3', icon: LayoutTemplate, desc: 'Semantic layouts, responsive flexbox/grid structures, and custom typography.' },
    { name: 'React', icon: Code2, desc: 'Component-based UI architectures, state management, and modern hooks.' },
    { name: 'Tailwind CSS', icon: MonitorSmartphone, desc: 'Utility-first styling, rapid UI development, and responsive design.' },
    { name: 'Git & GitHub', icon: GitBranch, desc: 'Decentralized version control, team branch merging workflows, and commit grids.' },
    { name: 'Google Cloud Platform', icon: Cloud, desc: 'Cloud console bucket storage, virtual nodes orchestration, and model testing.' }
  ]
};

const coreSkills = {
  title: "CORE CODE & INTELLIGENT SYSTEMS",
  icon: Cpu,
  panelId: "SYS_BE_MATRIX",
  skills: [
    { name: 'Node.js', icon: Cpu, desc: 'Server-side runtime environments, asynchronous task managers, backend logic.' },
    { name: 'Express.js', icon: Layers, desc: 'API endpoint configurations, request routing filters, and middleware pipelines.' },
    { name: 'Java', icon: Code2, desc: 'Object-Oriented design patterns, abstract class hierarchy, and robust program flows.' },
    { name: 'Python', icon: Braces, desc: 'Scripting automation routines, data pipelines, and machine learning structures.' },
    { name: 'C Programming', icon: TerminalSquare, desc: 'CLI modular systems, persistent file management inputs, and account ledger algorithms.' },
    { name: 'MySQL', icon: Database, desc: 'Relational schema structures, complex query designs, and table mapping linkages.' },
    { name: 'MongoDB', icon: Database, desc: 'NoSQL document storage frameworks, flexible collection schemas, and JSON arrays.' },
    { name: 'Generative AI', icon: Sparkles, desc: 'Prompt engineering parameters, Generative AI models, and vector processing.' },
    { name: 'Machine Learning', icon: Brain, desc: 'Data processing pipelines, pattern classification subroutines, and basic models.' }
  ]
};

const HUDModulePanel = ({ data, isDark }) => {
  const PanelIcon = data.icon;

  return (
    <div
      className={`relative w-full overflow-hidden flex flex-col p-6 sm:p-8 rounded-xl border h-full ${
        isDark 
          ? 'bg-black/70 border-white/10 hover:border-neon-cyan/25 shadow-[0_0_20px_rgba(0,0,0,0.5)]' 
          : 'bg-white border-gray-200 shadow-md hover:border-blue-400'
      } transition-colors duration-300`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 0 100%)'
      }}
    >
      {/* Header bar */}
      <div className="flex justify-between items-center mb-6 pb-3 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded border ${isDark ? 'bg-gray-900 border-neon-purple/40 text-neon-purple' : 'bg-pink-50 border-pink-200 text-pink-600'}`}>
            <PanelIcon className="w-6 h-6" />
          </div>
          <div>
            <h4 className={`text-base sm:text-lg font-orbitron font-bold tracking-widest ${isDark ? 'text-white text-glow-purple' : 'text-gray-900'}`}>
              {data.title}
            </h4>
            <span className={`block font-mono text-[9px] ${isDark ? 'text-neon-cyan/50' : 'text-blue-500'}`}>
              SYSTEM // {data.panelId}
            </span>
          </div>
        </div>
      </div>

      {/* Skills list cards - static panels without progress bars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.skills.map((skill) => {
          const Icon = skill.icon;
          return (
            <div 
              key={skill.name} 
              className={`p-4 rounded border relative transition-all duration-300 flex flex-col ${
                isDark 
                  ? 'bg-white/[0.02] border-white/5 hover:border-neon-cyan/35 hover:bg-neon-cyan/[0.02]' 
                  : 'bg-gray-50 border-gray-200 hover:bg-blue-50/30 hover:border-blue-300'
              }`}
            >
              <div className="flex items-center gap-2.5 mb-1.5 flex-shrink-0">
                <Icon className={`w-4 h-4 ${isDark ? 'text-neon-cyan animate-pulse' : 'text-blue-600'}`} />
                <span className={`font-orbitron font-bold text-sm tracking-wide ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {skill.name}
                </span>
              </div>
              <p className={`font-rajdhani text-xs leading-relaxed flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                {skill.desc}
              </p>

              {/* Aesthetic cyber corner bracket */}
              <div className={`absolute top-0 right-0 w-1 h-1 border-t border-r ${isDark ? 'border-neon-cyan/20' : 'border-blue-200'}`} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="skills" className="py-24 relative min-h-screen overflow-hidden bg-transparent flex flex-col justify-center">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1] cyber-grid-bg" />

      {/* Cyber glows */}
      <div className={`absolute top-1/3 -left-64 w-80 h-80 blur-[130px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-purple/10' : 'bg-pink-300/20'}`} />
      <div className={`absolute bottom-1/3 -right-64 w-80 h-80 blur-[130px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-cyan/10' : 'bg-blue-300/20'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        
        {/* Section title header */}
        <div className="flex flex-col items-center mb-16 pt-10">
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${isDark ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
            <Cpu className="w-4 h-4" />
            <span className="font-orbitron text-xs tracking-widest font-bold">CAPABILITY_MATRIX</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 text-center ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            CAPABILITIES ARSENAL
          </h2>
          <div className="flex gap-2">
            <div className={`w-16 h-1 ${isDark ? 'bg-neon-purple box-glow' : 'bg-pink-500'}`} />
            <div className={`w-8 h-1 ${isDark ? 'bg-neon-cyan box-glow-cyan' : 'bg-blue-500'}`} />
          </div>
        </div>

        {/* Modules Console Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          <HUDModulePanel data={webSkills} isDark={isDark} />
          <HUDModulePanel data={coreSkills} isDark={isDark} />
        </div>

      </div>
    </section>
  );
};

export default Skills;
