import { useState, useRef } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import { Send, Terminal, Mail } from 'lucide-react';
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
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const cardRef = useRef(null);
  
  // Hover glow effect values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove(e) {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // For the glow effect
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  }

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
            access_key: "27324548-04fc-4366-9e94-405ce17207f1", 
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
      <div className={`absolute bottom-0 right-0 w-[600px] h-[600px] blur-[150px] pointer-events-none ${isDark ? 'bg-neon-cyan/5' : 'bg-blue-300/10'}`} />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-orbitron font-bold mb-4 ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}>
            <span className={isDark ? 'text-neon-cyan' : 'text-blue-600'}>&gt;</span> COMM_LINK
          </h2>
          <div className={`w-24 h-1 mx-auto ${isDark ? 'bg-neon-purple box-glow' : 'bg-blue-500'}`} />
        </motion.div>

        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          onMouseMove={handleMouseMove}
          className="relative"
        >
          {/* Linear Gradient Box Shadow */}
          <div className={`absolute -inset-1 rounded-2xl blur-xl opacity-70 animate-pulse ${
            isDark 
              ? 'bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-cyan' 
              : 'bg-gradient-to-r from-blue-400 via-pink-400 to-blue-400'
          }`} />

          <div className={`p-1 relative z-10 overflow-hidden transition-colors duration-300 ${
            isDark ? 'bg-black/90 border border-white/10' : 'bg-white border border-gray-200'
          }`} style={{ clipPath: 'polygon(0 0, 100% 0, 100% calc(100% - 30px), calc(100% - 30px) 100%, 0 100%)' }}>
            
            {/* Glow effect on hover */}
            <motion.div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 hover:opacity-100 z-0"
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

            {/* Corner Crosshairs */}
            <div className={`absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 pointer-events-none ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
            <div className={`absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 pointer-events-none ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
            <div className={`absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 pointer-events-none ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
            
            <div className={`p-8 relative z-10 flex flex-col h-full ${isDark ? 'bg-black/80 backdrop-blur-md' : 'bg-white/90'}`}>
              <div className={`flex items-center gap-2 mb-8 border-b pb-4 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
                <Terminal className={`w-6 h-6 animate-pulse ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`} />
                <span className={`font-mono text-sm tracking-widest ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}>SYS.COMM_ARRAY // SECURE_UPLINK</span>
              </div>

              {/* Contact Icons */}
              <div className="flex justify-center gap-6 mb-10">
                <a href="mailto:shreyasra7@gmail.com" className={`flex flex-col items-center gap-2 group transition-transform hover:scale-110 ${isDark ? 'text-gray-400 hover:text-neon-cyan' : 'text-gray-600 hover:text-blue-600'}`}>
                  <div className={`p-4 rounded-lg border-2 transform rotate-45 transition-colors ${isDark ? 'border-white/10 group-hover:border-neon-cyan bg-black' : 'border-gray-200 group-hover:border-blue-600 bg-white'}`}>
                    <Mail className="w-6 h-6 -rotate-45" />
                  </div>
                  <span className="font-orbitron text-xs mt-2">EMAIL</span>
                </a>
                <a href="https://github.com/Shreyas142004" target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-2 group transition-transform hover:scale-110 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-black'}`}>
                  <div className={`p-4 rounded-lg border-2 transform rotate-45 transition-colors ${isDark ? 'border-white/10 group-hover:border-white bg-black' : 'border-gray-200 group-hover:border-gray-800 bg-white'}`}>
                    <GithubIcon className="w-6 h-6 -rotate-45" />
                  </div>
                  <span className="font-orbitron text-xs mt-2">GITHUB</span>
                </a>
                <a href="https://www.linkedin.com/in/shreyas-r-a-6a0567305" target="_blank" rel="noreferrer" className={`flex flex-col items-center gap-2 group transition-transform hover:scale-110 ${isDark ? 'text-gray-400 hover:text-[#0077b5]' : 'text-gray-600 hover:text-[#0077b5]'}`}>
                  <div className={`p-4 rounded-lg border-2 transform rotate-45 transition-colors ${isDark ? 'border-white/10 group-hover:border-[#0077b5] bg-black' : 'border-gray-200 group-hover:border-[#0077b5] bg-white'}`}>
                    <LinkedinIcon className="w-6 h-6 -rotate-45" />
                  </div>
                  <span className="font-orbitron text-xs mt-2">LINKEDIN</span>
                </a>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6 flex-grow flex flex-col">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2 relative group">
                    <label className="font-orbitron text-xs tracking-widest text-gray-400 uppercase">Identity</label>
                    <input 
                      type="text" 
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({...formState, name: e.target.value})}
                      className={`w-full border-b-2 bg-transparent px-2 py-3 font-rajdhani focus:outline-none transition-colors ${
                        isDark 
                          ? 'border-white/20 text-white focus:border-neon-cyan focus:bg-neon-cyan/5' 
                          : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                      }`}
                      placeholder="[ ENTER_NAME ]"
                    />
                  </div>
                  <div className="space-y-2 relative group">
                    <label className="font-orbitron text-xs tracking-widest text-gray-400 uppercase">Comm Array (Email)</label>
                    <input 
                      type="email" 
                      required
                      value={formState.email}
                      onChange={(e) => setFormState({...formState, email: e.target.value})}
                      className={`w-full border-b-2 bg-transparent px-2 py-3 font-rajdhani focus:outline-none transition-colors ${
                        isDark 
                          ? 'border-white/20 text-white focus:border-neon-purple focus:bg-neon-purple/5' 
                          : 'border-gray-300 text-gray-900 focus:border-pink-500 focus:bg-pink-50'
                      }`}
                      placeholder="[ ENTER_EMAIL ]"
                    />
                  </div>
                </div>

                <div className="space-y-2 relative group flex-grow">
                  <label className="font-orbitron text-xs tracking-widest text-gray-400 uppercase">Transmission Data</label>
                  <textarea 
                    required
                    rows="5"
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                    className={`w-full border-2 bg-transparent p-4 font-rajdhani focus:outline-none transition-colors resize-none h-full rounded-tl-2xl rounded-br-2xl ${
                      isDark 
                        ? 'border-white/20 text-white focus:border-neon-cyan focus:bg-neon-cyan/5' 
                        : 'border-gray-300 text-gray-900 focus:border-blue-500 focus:bg-blue-50'
                    }`}
                    placeholder="[ ENTER_MESSAGE_PAYLOAD ]"
                  />
                </div>

                <motion.button
                  whileHover={window.matchMedia("(hover: hover)").matches ? { scale: 1.02 } : {}}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                  className={`w-full relative group overflow-hidden mt-6 p-4 rounded-tl-2xl rounded-br-2xl ${
                    isDark ? 'bg-neon-cyan/10 border-2 border-neon-cyan' : 'bg-blue-100 border-2 border-blue-600'
                  }`}
                >
                  <div className={`absolute inset-0 w-0 transition-all duration-300 ease-out group-hover:w-full ${
                    isDark ? 'bg-neon-cyan' : 'bg-blue-600'
                  }`} />
                  <div className={`relative flex items-center justify-center gap-2 font-orbitron font-bold tracking-widest uppercase transition-colors ${
                    isDark ? 'text-neon-cyan group-hover:text-black' : 'text-blue-600 group-hover:text-white'
                  }`}>
                    {isSubmitting ? (
                      'TRANSMITTING...'
                    ) : isSuccess ? (
                      'DATA SENT SUCCESSFULLY'
                    ) : (
                      <>
                        <Send className="w-5 h-5" /> Initialize Transfer
                      </>
                    )}
                  </div>
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
