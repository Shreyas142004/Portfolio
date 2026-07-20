import { useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Award, Eye, Download, X, ShieldCheck, Cpu } from 'lucide-react';
import { useTheme } from './ThemeContext';

const certificatesData = [
  {
    id: 1,
    certId: "CRT-GAI-01",
    title: 'Introduction to Generative AI Studio',
    issuer: 'Google Cloud',
    date: '2026',
    file: './Generative AI Studio.pdf',
    description: 'Mission accomplished: Explored the cutting-edge of artificial intelligence, mastering industry-aligned Generative AI models. Unlocked new capabilities in prompt engineering, model tuning, and integrating AI architectures.',
  },
  {
    id: 2,
    certId: "CRT-GIT-02",
    title: 'Advanced Git Concepts',
    issuer: 'Online Course Certification',
    date: '2026',
    file: './Advanced Git Concepts.pdf',
    description: 'Mission accomplished: Mastered advanced version control workflows, complex branching strategies, and decentralized repository architecture to dominate codebase management and team collaboration.',
  },
  {
    id: 3,
    certId: "CRT-GCB-03",
    title: 'Google Cloud Bootcamp',
    issuer: 'Google Cloud / Hack2Skill',
    date: '2026',
    file: './Google_Bootcamp-H2S.pdf',
    description: 'Completed comprehensive hands-on boot camp covering Google Cloud core infrastructures, AI tools, serverless architectures, and collaborative development cycles.',
  },
  {
    id: 4,
    certId: "CRT-MOOC-04",
    title: 'MOOC Course Certification',
    issuer: 'Online Course Certification',
    date: '2026',
    file: './MOOC-Course.pdf',
    description: 'Mastered fundamental developer workflows, algorithms, and core design structures, verified through final evaluation.',
  }
];

const CertificateCard = ({ cert, index, isDark, onPreview }) => {
  const cardRef = useRef(null);
  
  // Hover glow effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // 3D Tilt values
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 25 });
  
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
      className="perspective-1000 h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={window.matchMedia("(hover: hover)").matches ? { scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 220, damping: 25 }}
        style={window.innerWidth >= 1024 ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        className={`group p-8 rounded-xl flex flex-col h-full border backdrop-blur-sm transition-all duration-300 relative overflow-hidden ${
          isDark 
            ? 'bg-black/60 border-white/10 hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,255,255,0.08)]' 
            : 'bg-white border-gray-200 hover:shadow-xl hover:border-blue-500'
        }`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                350px circle at ${mouseX}px ${mouseY}px,
                ${isDark ? 'rgba(0, 255, 255, 0.12)' : 'rgba(37, 99, 235, 0.08)'},
                transparent 85%
              )
            `,
          }}
        />

        {/* Small Corner Decor Tag */}
        <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${isDark ? 'border-neon-cyan/40' : 'border-blue-200'}`} />

        <div className="relative z-10 flex flex-col h-full lg:[transform:translateZ(25px)]">
          {/* Header Row */}
          <div className="mb-6 flex justify-between items-center">
            <div className={`p-3 rounded-lg border ${
              isDark ? 'bg-neon-cyan/5 border-neon-cyan/25 text-neon-cyan' : 'bg-blue-50 border-blue-200 text-blue-600'
            }`}>
              <Award className="w-6 h-6" />
            </div>
            <div className="flex flex-col items-end font-mono text-[9px] text-gray-500">
              <span className={isDark ? "text-neon-purple" : "text-pink-600"}>{cert.certId}</span>
              <span>YEAR: {cert.date}</span>
            </div>
          </div>

          <h3 className={`text-xl sm:text-2xl font-orbitron font-bold mb-1 ${isDark ? 'text-white group-hover:text-glow-cyan' : 'text-gray-900'}`}>
            {cert.title}
          </h3>
          
          <p className={`font-rajdhani font-bold text-sm mb-4 uppercase tracking-widest ${isDark ? 'text-neon-purple' : 'text-pink-600'}`}>
            {cert.issuer}
          </p>
          
          <p className={`font-rajdhani text-sm leading-relaxed mb-8 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {cert.description}
          </p>

          {/* Action triggers */}
          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-white/5">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPreview(cert);
              }}
              className={`flex-1 relative z-50 inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded font-orbitron text-xs font-bold tracking-wider transition-all duration-300 ${
                isDark
                  ? 'bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                  : 'bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
              }`}
            >
              <Eye className="w-3.5 h-3.5" /> PREVIEW
            </button>
            
            <a
              href={cert.file}
              download
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 relative z-50 inline-flex justify-center items-center gap-2 py-2.5 px-4 rounded font-orbitron text-xs font-bold tracking-wider transition-all duration-300 ${
                isDark
                  ? 'bg-neon-purple/10 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(204,0,255,0.4)]'
                  : 'bg-pink-50 border border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white'
              }`}
            >
              <Download className="w-3.5 h-3.5" /> DOWNLOAD
            </a>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const [previewCert, setPreviewCert] = useState(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="certificates" className="py-24 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1] cyber-grid-bg" />

      {/* Background Decor Ambient */}
      <div className={`absolute top-1/3 left-0 w-[450px] h-[450px] blur-[130px] rounded-full pointer-events-none -z-10 ${isDark ? 'bg-neon-cyan/5' : 'bg-blue-300/10'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${
            isDark ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="font-orbitron text-xs tracking-widest font-bold font-mono">SYS_CREDENTIALS</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 tracking-widest ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            CREDENTIAL ARCHIVE
          </h2>
          <div className={`w-28 h-1 mx-auto ${isDark ? 'bg-neon-cyan box-glow-cyan' : 'bg-blue-500'}`} />
        </motion.div>

        {/* Certificate Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} isDark={isDark} onPreview={setPreviewCert} />
          ))}
        </div>
      </div>

      {/* Decryption Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md ${isDark ? 'bg-black/75' : 'bg-gray-900/50'}`}
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl h-[85vh] rounded-xl overflow-hidden relative border flex flex-col ${
                isDark ? 'bg-black border-neon-cyan/40 box-glow shadow-[0_0_35px_rgba(0,255,255,0.1)]' : 'bg-white border-gray-200 shadow-2xl'
              }`}
            >
              {/* Close trigger */}
              <button 
                onClick={() => setPreviewCert(null)}
                className={`absolute top-4 right-4 z-50 p-2 rounded backdrop-blur-sm transition-colors ${
                  isDark ? 'bg-black/60 text-white hover:text-neon-cyan border border-white/10' : 'bg-white/80 text-gray-800 border border-gray-200'
                }`}
              >
                <X className="w-4 h-4" />
              </button>

              {/* Header inside modal */}
              <div className={`p-4 border-b flex items-center gap-2.5 font-mono text-[11px] tracking-widest ${
                isDark ? "bg-[#08080f]/90 border-white/10 text-neon-cyan" : "bg-gray-50 border-gray-200 text-blue-600"
              }`}>
                <ShieldCheck className="w-4 h-4" /> 
                <span>SYSTEM.VIEWPORT // SECURE_DECRYPT: {previewCert.certId}</span>
              </div>
              
              <div className="w-full h-full p-2 bg-black">
                <iframe 
                  src={`${previewCert.file}#toolbar=0`} 
                  className="w-full h-full rounded border-none"
                  title="Certificate Preview"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
