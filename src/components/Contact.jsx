import { useState, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Send, Terminal, Copy, Check, Download } from 'lucide-react';
import { useTheme } from './ThemeContext';

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path>
    <path d="M9 18c-4.51 2-5-2-7-2"></path>
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Contact = () => {
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardRef = useRef(null);
  
  // Hover glow coordinates
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('shreyasra7@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: import.meta.env.VITE_WEB3FORMS_ACCESS_KEY, 
            name: formState.name,
            email: formState.email,
            message: formState.message,
            subject: "New Message from Portfolio"
        })
      });
      
      const json = await response.json();
      
      if (response.status === 200) {
        setIsSuccess(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        alert(json.message || "Failed to send message.");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while sending the message.");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setIsSuccess(false), 3000);
    }
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden min-h-screen bg-transparent">
      {/* Abstract Grid background */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] z-[-1] cyber-grid-bg" />
      <div className={`absolute bottom-0 right-0 w-[550px] h-[550px] blur-[140px] pointer-events-none -z-10 ${isDark ? 'bg-neon-cyan/5' : 'bg-blue-300/10'}`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        
        {/* Section title header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-4 ${
            isDark ? 'bg-neon-cyan/10 border-neon-cyan/30 text-neon-cyan' : 'bg-blue-50 border-blue-200 text-blue-600'
          }`}>
            <Terminal className="w-4 h-4 animate-pulse" />
            <span className="font-orbitron text-xs tracking-widest font-bold font-mono">SYS_COMM_ARRAY</span>
          </div>
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            SECURE LINK UPLINK
          </h2>
          <div className={`w-28 h-1 mx-auto ${isDark ? 'bg-neon-purple box-glow' : 'bg-pink-500'}`} />
        </motion.div>

        {/* Communication Terminal */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          onMouseMove={handleMouseMove}
          className="relative"
        >
          {/* Neon outer gradient ring border */}
          <div className={`absolute -inset-1.5 rounded-2xl blur-xl opacity-60 animate-pulse ${
            isDark 
              ? 'bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan' 
              : 'bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400'
          }`} />

          <div className={`p-1 relative z-10 overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-black/90 border border-white/10' : 'bg-white border border-gray-200 shadow-xl'
          }`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
            
            {/* Hover mouse glow */}
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 hover:opacity-100 z-0"
              style={{
                background: useMotionTemplate`
                  radial-gradient(
                    450px circle at ${mouseX}px ${mouseY}px,
                    ${isDark ? 'rgba(0, 255, 255, 0.12)' : 'rgba(37, 99, 235, 0.06)'},
                    transparent 85%
                  )
                `,
              }}
            />

            {/* Brackets & Crosshairs */}
            <div className={`absolute top-2.5 left-2.5 w-5 h-5 border-t-2 border-l-2 pointer-events-none ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
            <div className={`absolute top-2.5 right-2.5 w-5 h-5 border-t-2 border-r-2 pointer-events-none ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
            <div className={`absolute bottom-2.5 left-2.5 w-5 h-5 border-b-2 border-l-2 pointer-events-none ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
            
            <div className={`p-6 sm:p-10 relative z-10 flex flex-col h-full ${isDark ? 'bg-black/75 backdrop-blur-md' : 'bg-white/90'}`}>
              
              {/* Header block with Availability and system log */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8 border-b border-white/10 pb-6">
                <div className="flex items-center gap-2">
                  <Terminal className={`w-5 h-5 animate-pulse ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`} />
                  <span className={`font-mono text-xs tracking-widest ${isDark ? 'text-neon-cyan/70' : 'text-blue-600'}`}>
                    UPLINK_ARRAY // SYSTEM_COMM_CHANNEL
                  </span>
                </div>
                
                {/* pulsing availability indicator */}
                <div className="flex items-center gap-2 bg-black/45 border border-white/10 px-3.5 py-1.5 rounded-full w-fit">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                  </span>
                  <span className="font-orbitron text-[9px] tracking-widest text-green-400 font-bold">
                    STABILITY: ACTIVE // OPEN TO HIRE
                  </span>
                </div>
              </div>

              {/* Action triggers: copy email & resume links */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <button
                  onClick={handleCopyEmail}
                  className={`flex items-center justify-between p-4 rounded border font-mono text-xs tracking-wider transition-all duration-300 ${
                    isDark 
                      ? 'bg-neon-cyan/5 border-neon-cyan/25 text-neon-cyan hover:bg-neon-cyan/10 hover:border-neon-cyan/50 hover:shadow-[0_0_15px_rgba(0,255,255,0.2)]'
                      : 'bg-blue-50 border-blue-200 text-blue-600 hover:bg-blue-100'
                  }`}
                >
                  <span className="font-bold">EMAIL: shreyasra7@gmail.com</span>
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>

                <a
                  href="./Shreyas.pdf"
                  download="Shreyas_Resume.pdf"
                  className={`flex items-center justify-between p-4 rounded border font-mono text-xs tracking-wider transition-all duration-300 ${
                    isDark 
                      ? 'bg-neon-purple/5 border-neon-purple/25 text-neon-purple hover:bg-neon-purple/10 hover:border-neon-purple/50 hover:shadow-[0_0_15px_rgba(188,19,254,0.2)]'
                      : 'bg-pink-50 border-pink-200 text-pink-600 hover:bg-pink-100'
                  }`}
                >
                  <span className="font-bold">DOWNLOAD CREDENTIALS RESUME</span>
                  <Download className="w-4 h-4" />
                </a>
              </div>

              {/* Secure Form payload */}
              <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 relative">
                    <label className={`font-orbitron text-[10px] tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Sender Identity Name
                    </label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className={`w-full border-2 rounded p-3 font-rajdhani text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'border-white/10 bg-black/40 text-white focus:border-neon-cyan focus:bg-neon-cyan/5' 
                          : 'border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                      }`}
                      placeholder="[ INPUT_NAME ]"
                    />
                  </div>
                  <div className="space-y-2 relative">
                    <label className={`font-orbitron text-[10px] tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                      Response Comm Channel (Email)
                    </label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className={`w-full border-2 rounded p-3 font-rajdhani text-sm focus:outline-none transition-colors ${
                        isDark 
                          ? 'border-white/10 bg-black/40 text-white focus:border-neon-purple focus:bg-neon-purple/5' 
                          : 'border-gray-200 bg-gray-50 text-gray-900 focus:border-pink-500 focus:bg-pink-50'
                      }`}
                      placeholder="[ INPUT_EMAIL_ADDRESS ]"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative flex-grow">
                  <label className={`font-orbitron text-[10px] tracking-widest uppercase ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
                    Decrypted Message Payload
                  </label>
                  <textarea 
                    required
                    rows="5"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className={`w-full border-2 rounded p-4 font-rajdhani text-sm focus:outline-none transition-colors resize-none h-32 ${
                      isDark 
                        ? 'border-white/10 bg-black/40 text-white focus:border-neon-cyan focus:bg-neon-cyan/5' 
                        : 'border-gray-200 bg-gray-50 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                    }`}
                    placeholder="[ ENTER_TRANSMISSION_PAYLOAD_HERE ]"
                  />
                </div>

                <motion.button
                  whileHover={window.matchMedia("(hover: hover)").matches ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full relative group overflow-hidden mt-4 p-4 rounded transition-all duration-300 border-2 ${
                    isDark 
                      ? 'bg-neon-cyan/10 border-neon-cyan text-neon-cyan hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]' 
                      : 'bg-blue-50 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                  }`}
                >
                  <div className={`absolute inset-y-0 left-0 w-0 transition-all duration-300 ease-out group-hover:w-full -z-10 ${
                    isDark ? 'bg-neon-cyan' : 'bg-blue-600'
                  }`} />
                  <div className={`relative flex items-center justify-center gap-2.5 font-orbitron font-bold tracking-widest uppercase transition-colors ${
                    isDark ? 'group-hover:text-black' : ''
                  }`}>
                    {isSubmitting ? (
                      'TRANSMITTING_PACKETS...'
                    ) : isSuccess ? (
                      'COMM_LINK SUCCESSFULLY DEPLOYED'
                    ) : (
                      <>
                        <Send className="w-4.5 h-4.5" /> Initialize System Transfer
                      </>
                    )}
                  </div>
                </motion.button>
              </form>

              {/* Footer social icons inside form container */}
              <div className="flex items-center justify-center gap-6 mt-10 border-t border-white/5 pt-8">
                <a 
                  href="https://github.com/Shreyas142004" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`flex items-center gap-1.5 font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                    isDark ? 'text-gray-500 hover:text-white' : 'text-gray-600 hover:text-black'
                  }`}
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>GITHUB</span>
                </a>
                
                <span className="text-gray-800">|</span>
                
                <a 
                  href="https://www.linkedin.com/in/shreyas-r-a-6a0567305" 
                  target="_blank" 
                  rel="noreferrer" 
                  className={`flex items-center gap-1.5 font-mono text-[10px] tracking-wider transition-colors duration-300 ${
                    isDark ? 'text-gray-500 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  <LinkedinIcon className="w-4 h-4" />
                  <span>LINKEDIN</span>
                </a>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
