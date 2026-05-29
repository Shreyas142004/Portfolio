import { useState, useRef } from 'react';
import { motion, useSpring, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'framer-motion';
import { Award, Eye, Download, X } from 'lucide-react';
import { useTheme } from './ThemeContext';

const certificatesData = [
  {
    id: 1,
    title: 'Introduction to Generative AI Studio',
    issuer: 'Google Cloud',
    date: '2026',
    file: './Generative AI Studio.pdf',
    description: '📢 I am super excited to share that I’ve just completed Introduction to Generative AI Studio. 🎓 I had a great experience learning industry aligned skills of AI.',
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
      className="perspective-1000 h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={window.matchMedia("(hover: hover)").matches ? { scale: 1.03 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={window.innerWidth >= 1024 ? { rotateX, rotateY, transformStyle: "preserve-3d" } : {}}
        className={`group p-8 rounded-2xl flex flex-col h-full border backdrop-blur-sm transition-colors duration-300 relative overflow-hidden ${
          isDark 
            ? 'bg-black/40 border-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]' 
            : 'bg-white/80 border-gray-200 hover:shadow-xl hover:border-blue-500'
        }`}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                400px circle at ${mouseX}px ${mouseY}px,
                ${isDark ? 'rgba(0, 255, 255, 0.15)' : 'rgba(37, 99, 235, 0.1)'},
                transparent 80%
              )
            `,
          }}
        />

        <div className="relative z-10 flex flex-col h-full lg:[transform:translateZ(30px)]">
          <div className="mb-6 flex justify-between items-start">
            <div className={`p-4 rounded-xl ${isDark ? 'bg-neon-cyan/10 text-neon-cyan' : 'bg-blue-100 text-blue-600'}`}>
              <Award className="w-8 h-8" />
            </div>
            <div className={`font-rajdhani font-bold tracking-widest text-sm ${isDark ? 'text-neon-cyan/70' : 'text-blue-500'}`}>
              {cert.date}
            </div>
          </div>

          <h3 className={`text-2xl font-orbitron font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {cert.title}
          </h3>
          <p className={`font-rajdhani font-bold text-lg mb-4 uppercase tracking-wider ${isDark ? 'text-neon-purple' : 'text-pink-600'}`}>
            {cert.issuer}
          </p>
          
          <p className={`font-rajdhani text-base mb-8 flex-grow ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {cert.description}
          </p>

          <div className="flex items-center gap-4 mt-auto">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onPreview(cert);
              }}
              className={`flex-1 relative z-50 inline-flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-orbitron text-sm font-bold tracking-wider transition-all duration-300 ${
                isDark
                  ? 'bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                  : 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md'
              }`}
            >
              <Eye className="w-4 h-4" /> PREVIEW
            </button>
            
            <a
              href={cert.file}
              download
              onClick={(e) => e.stopPropagation()}
              className={`flex-1 relative z-50 inline-flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-orbitron text-sm font-bold tracking-wider transition-all duration-300 ${
                isDark
                  ? 'bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(204,0,255,0.4)]'
                  : 'bg-pink-50 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white hover:shadow-md'
              }`}
            >
              <Download className="w-4 h-4" /> DOWNLOAD
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
      {/* Background Decor */}
      <div className={`absolute top-1/3 left-0 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none ${isDark ? 'bg-neon-cyan/5' : 'bg-blue-300/20'}`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-6 tracking-widest ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            CERTIFICATES
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-cyan box-glow' : 'bg-blue-500'}`} />
          <p className={`mt-6 font-rajdhani text-xl max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Professional certifications and achievements
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificatesData.map((cert, index) => (
            <CertificateCard key={cert.id} cert={cert} index={index} isDark={isDark} onPreview={setPreviewCert} />
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      <AnimatePresence>
        {previewCert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-sm ${isDark ? 'bg-black/80' : 'bg-gray-900/60'}`}
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl h-[85vh] rounded-2xl overflow-hidden relative border ${isDark ? 'bg-black border-neon-cyan/50 box-glow' : 'bg-white border-gray-200 shadow-2xl'}`}
            >
              <button 
                onClick={() => setPreviewCert(null)}
                className={`absolute top-4 right-4 z-50 p-2 rounded-full backdrop-blur-sm transition-colors ${
                  isDark ? 'bg-black/50 text-white hover:text-neon-cyan' : 'bg-white/80 text-gray-800 hover:text-blue-600'
                }`}
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="w-full h-full p-2 pt-14">
                <iframe 
                  src={`${previewCert.file}#toolbar=0`} 
                  className="w-full h-full rounded-xl border-none"
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
