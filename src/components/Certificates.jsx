import { motion } from 'framer-motion';
import { Award, Eye, Download } from 'lucide-react';
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

const Certificates = () => {
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
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`group p-8 rounded-2xl flex flex-col h-full border backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 ${
                isDark 
                  ? 'bg-black/40 border-neon-cyan/20 hover:border-neon-cyan hover:shadow-[0_0_30px_rgba(0,255,255,0.15)]' 
                  : 'bg-white/80 border-gray-200 hover:shadow-xl'
              }`}
            >
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
                <a
                  href={cert.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-orbitron text-sm font-bold tracking-wider transition-all duration-300 ${
                    isDark
                      ? 'bg-transparent border border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black hover:shadow-[0_0_15px_rgba(0,255,255,0.4)]'
                      : 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white hover:shadow-md'
                  }`}
                >
                  <Eye className="w-4 h-4" /> PREVIEW
                </a>
                
                <a
                  href={cert.file}
                  download
                  className={`flex-1 inline-flex justify-center items-center gap-2 py-3 px-4 rounded-lg font-orbitron text-sm font-bold tracking-wider transition-all duration-300 ${
                    isDark
                      ? 'bg-neon-purple/20 border border-neon-purple text-neon-purple hover:bg-neon-purple hover:text-white hover:shadow-[0_0_15px_rgba(204,0,255,0.4)]'
                      : 'bg-pink-50 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white hover:shadow-md'
                  }`}
                >
                  <Download className="w-4 h-4" /> DOWNLOAD
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
