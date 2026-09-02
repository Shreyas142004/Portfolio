import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Award, Eye, Download, X, ShieldCheck, Cpu, ExternalLink } from 'lucide-react';
import { useTheme } from './ThemeContext';

const certificatesData = [
  {
    id: 1,
    certId: "CRT-DLT-01",
    title: 'Deloitte Technology Certification',
    issuer: 'Deloitte',
    date: '2026',
    file: './Deloitte.pdf',
    description: 'Completed Deloitte Technology consulting virtual experience, analyzing technology strategy, cloud architecture, and system integration solutions.',
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className="perspective-1000 h-full"
      style={{ perspective: 1000 }}
    >
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400, damping: 28 }}
        className={`group p-8 rounded-xl flex flex-col h-full border backdrop-blur-sm transition-all duration-300 relative overflow-hidden ${
          isDark 
            ? 'bg-black/60 border-white/10 hover:border-neon-cyan hover:shadow-[0_0_25px_rgba(0,255,255,0.08)]' 
            : 'bg-white border-gray-200 hover:shadow-xl hover:border-blue-500'
        }`}
        style={{
          clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 0 100%)'
        }}
      >
        {/* Small Corner Decor Tag */}
        <div className={`absolute top-0 right-0 w-1.5 h-1.5 border-t border-r ${isDark ? 'border-neon-cyan/40' : 'border-blue-200'}`} />

        <div className="relative z-10 flex flex-col h-full">
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
                  : 'bg-pink-50 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white'
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setPreviewCert(null);
    };

    if (previewCert) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewCert]);

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
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center p-3 sm:p-6 pt-16 sm:pt-6 backdrop-blur-md bg-black/85 select-none overflow-y-auto"
            onClick={() => setPreviewCert(null)}
          >
            <motion.div
              initial={{ scale: 0.93, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.93, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              className={`w-full max-w-4xl h-[82vh] sm:h-[85vh] max-h-[820px] rounded-xl overflow-hidden relative border flex flex-col my-auto ${
                isDark ? 'bg-[#08080f] border-neon-cyan/40 box-glow shadow-[0_0_35px_rgba(0,255,255,0.15)]' : 'bg-white border-gray-200 shadow-2xl'
              }`}
            >
              {/* Header inside modal */}
              <div className={`p-3 sm:p-4 border-b flex items-center justify-between font-mono text-xs tracking-widest ${
                isDark ? "bg-[#0c0c16] border-white/10 text-neon-cyan" : "bg-gray-50 border-gray-200 text-blue-600"
              }`}>
                <div className="flex items-center gap-2 truncate pr-2">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" /> 
                  <span className="truncate">{previewCert.certId} // {previewCert.title}</span>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <a 
                    href={previewCert.file}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded font-mono text-xs font-bold border transition-all ${
                      isDark 
                        ? 'bg-neon-cyan/10 border-neon-cyan/40 text-neon-cyan hover:bg-neon-cyan hover:text-black' 
                        : 'bg-blue-50 border-blue-300 text-blue-600 hover:bg-blue-600 hover:text-white'
                    }`}
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>FULL TAB</span>
                  </a>
                  <button 
                    onClick={() => setPreviewCert(null)}
                    className="p-1.5 px-2.5 rounded font-mono text-xs font-bold border bg-red-500/20 border-red-500/40 text-red-400 hover:bg-red-500 hover:text-white transition-all"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4 inline mr-1" />
                    <span>CLOSE</span>
                  </button>
                </div>
              </div>

              {/* Mobile Action Controls Banner */}
              <div className="sm:hidden flex items-center justify-around gap-2 p-2 bg-[#0c0c16] border-b border-white/10">
                <a
                  href={previewCert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex justify-center items-center gap-1.5 py-2 px-3 rounded bg-neon-cyan/15 border border-neon-cyan/40 text-neon-cyan font-mono text-xs font-bold"
                >
                  <ExternalLink className="w-3.5 h-3.5" /> OPEN FULL TAB
                </a>
                <a
                  href={previewCert.file}
                  download
                  className="flex-1 inline-flex justify-center items-center gap-1.5 py-2 px-3 rounded bg-neon-purple/15 border border-neon-purple/40 text-neon-purple font-mono text-xs font-bold"
                >
                  <Download className="w-3.5 h-3.5" /> DOWNLOAD
                </a>
              </div>
              
              <div className="w-full h-full p-2 bg-black/90 relative overflow-hidden flex-grow">
                <object 
                  data={`${previewCert.file}#toolbar=0`} 
                  type="application/pdf"
                  className="w-full h-full rounded border-none"
                >
                  <iframe 
                    src={`${previewCert.file}#toolbar=0`} 
                    className="w-full h-full rounded border-none"
                    title="Certificate Preview"
                  />
                </object>
              </div>

              {/* Bottom Touch Close Button for Mobile */}
              <div className="sm:hidden p-2.5 border-t border-white/10 bg-[#08080f] flex justify-center">
                <button
                  onClick={() => setPreviewCert(null)}
                  className="w-full py-2.5 bg-red-600/30 border border-red-500/60 text-red-300 font-orbitron font-bold text-xs rounded tracking-widest flex items-center justify-center gap-2"
                >
                  <X className="w-4 h-4" /> CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Certificates;
