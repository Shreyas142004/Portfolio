import { useState, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useTransform
} from "framer-motion";
import { Code, X, ExternalLink, ShieldCheck, Terminal, FolderGit2 } from "lucide-react";
import { useTheme } from "./ThemeContext";

const projectsData = [
  {
    id: 1,
    projId: "PRJ-ATM-01",
    status: "STABLE // ONLINE",
    title: "ATM System",
    category: "C Programming",
    image: "./c project.png",
    shortDescription:
      "A complete Automated Teller Machine simulation developed in modular C.",
    fullDescription:
      "This system simulates core banking operations within an ATM terminal. Built entirely in C, it maps out account state matrices, processes secure transaction limits, and leverages low-level file storage (I/O) to persist banking ledgers across sessions.",
    features: [
      "Secure PIN validation checks",
      "Persistent state accounting via File I/O",
      "Modular transaction processing modules"
    ],
    tech: ["C Programming", "CLI", "Data Structures", "File I/O"],
    link: "https://github.com/Shreyas142004/ATM-simulation-C.git",
    github: "https://github.com/Shreyas142004/ATM-simulation-C.git",
  },
  {
    id: 2,
    projId: "PRJ-UTL-02",
    status: "STABLE // ONLINE",
    title: "Smart Utility Portal",
    category: "Web Development",
    image: "./web project.png",
    shortDescription:
      "Responsive metric dashboard front-end for intelligent utility tracking.",
    fullDescription:
      "An analytical data-dashboard frontend node configured for monitoring smart energy and water utilities. Crafted with React and designed around modular layouts, this project utilizes Tailwind CSS utility grids to deliver real-time visual statistics across all device viewports.",
    features: [
      "Interactive data grids & utility gauges",
      "Reusable React component tree structures",
      "Fully adaptive mobile-first styling layout"
    ],
    tech: ["React", "Tailwind CSS", "Vite", "ES6 JS"],
    link: "https://github.com/Shreyas142004/Smart-Utility-Portal.git",
    github: "https://github.com/Shreyas142004/Smart-Utility-Portal.git",
  },
  {
    id: 3,
    projId: "PRJ-STT-03",
    status: "DECRYPTED // STABLE",
    title: "AI Speech-to-Text",
    category: "Machine Learning",
    image: "./speech.png",
    shortDescription:
      "AI neural transcription engine designed to translate speech inputs to clean text logs.",
    fullDescription:
      "A high-fidelity speech-to-text algorithm mapped in Python. Utilizing pre-trained audio transcription models, the project maps speech signals to textual datasets, enabling high accuracy offline transcription subroutines.",
    features: [
      "Signal-to-text transcription models",
      "Custom audio file format preprocessing",
      "Optimized offline transcription nodes"
    ],
    tech: ["Python", "Machine Learning", "AI Models", "Speech recognition"],
    link: "https://speech-to-text-eight-mu.vercel.app/",
    github: "https://github.com/Shreyas142004/Speech-to-Text.git",
  },
  {
    id: 4,
    projId: "PRJ-PKP-04",
    status: "ACTIVE // STABLE",
    title: "Smart Parking Portal",
    category: "Web Development",
    image: "./Smart-Parking-Portal.png",
    shortDescription:
      "Full-stack reservation platform managing parking spaces in real-time.",
    fullDescription:
      "A complete MERN application facilitating online parking space reservations. Backed by a Node.js/Express.js backend and a scalable NoSQL MongoDB schema, it uses secure JWT tokens to authenticate and lock booking slots.",
    features: [
      "Real-time grid reservation tracking",
      "Token-authorized JSON Web Token guards",
      "MongoDB transactional document records"
    ],
    tech: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    link: "https://smart-parking-portal.vercel.app/",
    github: "https://github.com/Shreyas142004/Smart-Parking-Portal.git",
  },
  {
    id: 5,
    projId: "PRJ-CRM-05",
    status: "ACTIVE // DEPLOYED",
    title: "Smart CRM System",
    category: "Web Development",
    image: "./Smart CRM.png",
    shortDescription:
      "Role-based CRM platform with Admin, Sales, and Technical dashboards.",
    fullDescription:
      "Role-based CRM platform with Admin, Sales, and Technical dashboards. Features lead management, task assignment, email notifications, authentication, analytics, and workflow tracking.",
    features: [
      "Role-based dashboards (Admin, Sales, Tech)",
      "Automated lead management and task assignment",
      "Secure user authentication and workflow logging"
    ],
    tech: ["React", "Node", "MongoDB", "Express", "JWT"],
    link: "https://github.com/Shreyas142004/Smart-CRM.git",
    github: "https://github.com/Shreyas142004/Smart-CRM.git",
  }
];

const ProjectCard = ({ project, index, isDark, onClick }) => {
  const cardRef = useRef(null);

  // Hover glow coordinate variables
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt variables
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 450, damping: 28 });
  const mouseYSpring = useSpring(y, { stiffness: 450, damping: 28 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();

    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);

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
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="group perspective-1000 cursor-pointer h-full"
      onClick={() => onClick(project)}
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={window.matchMedia("(hover: hover)").matches ? { scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        className={`rounded-xl overflow-hidden relative border flex flex-col h-full ${
          isDark
            ? "glass-panel border-white/10 group-hover:border-neon-cyan/50 hover:shadow-[0_0_20px_rgba(0,255,255,0.05)]"
            : "bg-white shadow-lg border-gray-200 group-hover:border-blue-500"
        }`}
        style={{
          ...(window.innerWidth >= 1024 ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}),
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute -inset-px opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none z-30"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                ${isDark ? "rgba(0, 255, 255, 0.12)" : "rgba(37, 99, 235, 0.08)"},
                transparent 85%
              )
            `,
          }}
        />

        {/* Terminal Card Header */}
        <div className={`p-3 border-b flex justify-between items-center text-[10px] font-mono tracking-widest relative z-20 ${
          isDark ? "bg-[#08080f]/90 border-white/10 text-gray-500" : "bg-gray-50 border-gray-200 text-gray-400"
        }`}>
          <div className="flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-neon-cyan" />
            <span className={isDark ? "text-neon-cyan" : "text-blue-600"}>{project.projId}</span>
          </div>
          <span className={isDark ? "text-neon-purple" : "text-pink-600"}>{project.status}</span>
        </div>

        {/* Image Frame with Scanning lines */}
        <div className="relative h-44 overflow-hidden lg:[transform:translateZ(25px)] scan-line-overlay bg-black">
          <div className="scan-laser" />
          <div className={`absolute inset-0 opacity-15 group-hover:opacity-0 transition-opacity duration-300 z-10 ${
            isDark ? "bg-cyan-500/20 mix-blend-overlay" : "bg-blue-600/10 mix-blend-overlay"
          }`} />
          <img
            src={project.image}
            alt={project.title}
            className={`w-full h-full object-cover transition-all duration-700 ${
              isDark ? "grayscale brightness-75 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105" : "group-hover:scale-105"
            }`}
          />
        </div>

        {/* Info panel */}
        <div className={`p-6 flex-1 flex flex-col relative z-20 backdrop-blur-sm lg:[transform:translateZ(35px)] ${
          isDark ? "bg-black/75" : "bg-white/90"
        }`}>
          <span className={`block font-rajdhani text-[11px] font-bold tracking-widest uppercase mb-1.5 ${
            isDark ? "text-neon-purple" : "text-pink-600"
          }`}>
            {project.category}
          </span>
          <h3 className={`text-lg sm:text-xl font-orbitron font-bold mb-3 transition-colors duration-300 ${
            isDark ? "text-white group-hover:text-glow-cyan" : "text-gray-900 group-hover:text-blue-600"
          }`}>
            {project.title}
          </h3>

          <p className={`font-rajdhani text-sm mb-5 leading-relaxed flex-grow ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            {project.shortDescription}
          </p>

          {/* Render 3 main tech badges directly */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tech.slice(0, 3).map((badge) => (
              <span key={badge} className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                isDark 
                  ? "bg-neon-cyan/5 border border-neon-cyan/20 text-neon-cyan" 
                  : "bg-blue-50 border border-blue-200 text-blue-600"
              }`}>
                {badge}
              </span>
            ))}
            {project.tech.length > 3 && (
              <span className={`text-[10px] px-2 py-0.5 rounded font-mono ${
                isDark ? "bg-gray-900 text-gray-400" : "bg-gray-100 text-gray-500"
              }`}>
                +{project.tech.length - 3}
              </span>
            )}
          </div>

          <div className="flex justify-between items-center mt-auto border-t border-white/5 pt-4">
            <span className={`text-xs font-orbitron tracking-wider uppercase font-bold ${
              isDark ? "text-neon-cyan group-hover:text-neon-purple" : "text-blue-600"
            }`}>
              [ LOG_DECRYPT ]
            </span>
            <div className="flex gap-2">
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`p-2 rounded border transition-colors ${
                  isDark ? "border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan" : "border-gray-200 text-gray-700 hover:text-blue-600"
                }`}
              >
                <Code className="w-4 h-4" />
              </a>
              <a
                href={project.link}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`p-2 rounded border transition-colors ${
                  isDark ? "border-white/10 text-gray-400 hover:text-neon-purple hover:border-neon-purple" : "border-gray-200 text-gray-700 hover:text-pink-600"
                }`}
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Interactive glow border bar */}
        <div className={`absolute bottom-0 left-0 h-1 w-0 group-hover:w-full transition-all duration-300 z-20 ${
          isDark ? "bg-neon-cyan shadow-[0_0_10px_#00ffff]" : "bg-blue-600"
        }`} />
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="projects" className="relative bg-transparent py-24 min-h-screen overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1] cyber-grid-bg" />

      {/* Cyber ambient sphere glows */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[350px] blur-[150px] pointer-events-none -z-10 ${
        isDark ? "bg-neon-cyan/5" : "bg-blue-300/10"
      }`} />

      <div className="z-10 relative mx-auto px-4 sm:px-6 lg:px-8 pt-10 max-w-7xl">
        {/* Section title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${
            isDark ? 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple' : 'bg-pink-50 border-pink-200 text-pink-600'
          }`}>
            <FolderGit2 className="w-4 h-4" />
            <span className="font-orbitron text-xs tracking-widest font-bold font-mono">SYS_ARCHIVES</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? "text-white text-glow" : "text-gray-900"}`}>
            PROJECT ARCHIVE FILES
          </h2>
          <div className={`w-28 h-1 mx-auto ${isDark ? "bg-neon-cyan box-glow-cyan" : "bg-blue-500"}`} />
        </motion.div>

        {/* Project grid container */}
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
            className={`fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 pt-16 sm:pt-4 backdrop-blur-md ${
              isDark ? "bg-black/85" : "bg-gray-900/60"
            }`}
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className={`max-w-xl w-full max-h-[85vh] overflow-y-auto rounded-xl border relative flex flex-col ${
                isDark
                  ? "glass-panel border-neon-cyan/40 box-glow shadow-[0_0_30px_rgba(0,255,255,0.1)]"
                  : "bg-white border-gray-200 shadow-2xl"
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className={`absolute top-4 right-4 z-50 p-2 rounded backdrop-blur-sm transition-colors ${
                  isDark
                    ? "text-white/60 hover:text-neon-cyan bg-black/60 border border-white/10"
                    : "text-gray-500 hover:text-blue-600 bg-white/80 border border-gray-200"
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Cover Image */}
              <div className="relative h-44 sm:h-52 overflow-hidden flex-shrink-0 bg-black">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover brightness-90"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${
                  isDark ? "from-[#08080f] via-[#08080f]/50" : "from-white via-white/50"
                } to-transparent`} />
                
                <div className="absolute bottom-5 left-5 right-5">
                  <span className={`inline-block font-rajdhani font-bold text-xs tracking-widest uppercase mb-1.5 ${
                    isDark ? "text-neon-cyan" : "text-blue-600"
                  }`}>
                    {selectedProject.category} // {selectedProject.projId}
                  </span>
                  <h3 className={`text-xl sm:text-2xl font-orbitron font-bold ${
                    isDark ? "text-white text-glow" : "text-gray-900"
                  }`}>
                    {selectedProject.title}
                  </h3>
                </div>
              </div>

              {/* Modal Content Details */}
              <div className={`p-6 space-y-6 ${isDark ? "bg-[#08080f]/90" : "bg-white"}`}>
                <div className="space-y-2">
                  <div className={`flex items-center gap-1.5 font-mono text-[10px] uppercase font-bold ${
                    isDark ? "text-neon-purple" : "text-pink-600"
                  }`}>
                    <ShieldCheck className="w-4 h-4" /> Decryption Log Payload
                  </div>
                  <p className={`font-rajdhani text-base leading-relaxed ${
                    isDark ? "text-gray-300" : "text-gray-700"
                  }`}>
                    {selectedProject.fullDescription}
                  </p>
                </div>

                {/* Key Features Section */}
                <div className="space-y-3">
                  <h4 className={`font-orbitron font-bold text-xs tracking-wider uppercase ${
                    isDark ? "text-neon-cyan" : "text-blue-600"
                  }`}>
                    // CORE_CAPABILITIES
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.features.map((feature, idx) => (
                      <li key={idx} className="flex gap-2.5 items-start text-sm">
                        <span className={`font-mono text-xs ${isDark ? 'text-neon-purple/75' : 'text-pink-500'}`}>[{idx + 1}]</span>
                        <span className={isDark ? 'text-gray-300' : 'text-gray-700'}>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Badges Container */}
                <div className="space-y-2">
                  <h4 className={`font-orbitron font-bold text-xs tracking-wider uppercase ${
                    isDark ? "text-gray-500" : "text-gray-400"
                  }`}>
                    Technology Array
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.tech.map((t) => (
                      <span
                        key={t}
                        className={`px-2.5 py-1 text-xs font-mono rounded ${
                          isDark
                            ? "bg-neon-purple/5 border border-neon-purple/35 text-neon-purple"
                            : "bg-pink-50 border border-pink-200 text-pink-600"
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Links */}
                <div className="flex flex-wrap gap-3 pt-4 border-t border-white/5">
                  <a
                    href={selectedProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded font-orbitron font-bold text-xs tracking-widest transition-all ${
                      isDark
                        ? "bg-transparent border border-white/20 text-white hover:bg-white hover:text-black"
                        : "bg-transparent border border-gray-300 text-gray-800 hover:bg-gray-100"
                    }`}
                  >
                    <Code className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href={selectedProject.link}
                    target="_blank"
                    rel="noreferrer"
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded font-orbitron font-bold text-xs tracking-widest transition-all ${
                      isDark
                        ? "bg-neon-cyan/10 border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    <ExternalLink className="w-4 h-4" /> Launch Demo
                  </a>
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
