import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useMotionTemplate } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';
import { Terminal, Cpu, Activity, ShieldCheck, ArrowDown, Database, Layers } from 'lucide-react';

const bootLogs = [
  { text: ">> INITIATING SYSTEM OVERWRITE BOOT PROTOCOL...", delay: 200 },
  { text: ">> DEPLOYING KERNEL SHELL COMPATIBILITY MATRIX [OK]", delay: 150 },
  { text: ">> LOADING ASSET REGISTRIES & AUDIOS... NOMINAL", delay: 200 },
  { text: ">> DECRYPTING PORTFOLIO DATABASE ARRAYS...", delay: 250 },
  { text: ">> LOADED COMPONENT NODES: HERO, ABOUT, SKILLS, LOGS [OK]", delay: 150 },
  { text: ">> PORT LINK STABILITY DETECTED AT 100% SECURE", delay: 200 },
  { text: ">> INITIALIZATION COMPLETED. READY FOR DECRYPTION SHIELD.", delay: 300 }
];

// System Boot Screen animation
const BootScreen = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < bootLogs.length) {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, bootLogs[currentIndex].text]);
        setCurrentIndex(prev => prev + 1);
      }, bootLogs[currentIndex].delay);
      return () => clearTimeout(timer);
    } else {
      const completionTimer = setTimeout(() => {
        onComplete();
      }, 700);
      return () => clearTimeout(completionTimer);
    }
  }, [currentIndex, onComplete]);

  return (
    <div className="fixed inset-0 bg-[#030307] z-[9999] flex flex-col justify-center px-6 sm:px-12 md:px-24 font-mono select-none">
      <div className="max-w-3xl space-y-3">
        <div className="flex items-center gap-3 text-neon-cyan border-b border-neon-cyan/20 pb-4 mb-6">
          <Terminal className="w-6 h-6 animate-pulse" />
          <span className="text-lg font-bold tracking-widest">SHREYAS.RA // DEPLOY_LOGS</span>
        </div>

        <div className="space-y-2 min-h-[220px]">
          {lines.map((line, idx) => (
            <div key={idx} className={idx === lines.length - 1 ? "text-neon-cyan text-glow-cyan" : "text-gray-400"}>
              {line}
            </div>
          ))}
          {currentIndex < bootLogs.length && (
            <span className="inline-block w-2.5 h-4 bg-neon-cyan animate-pulse ml-1" />
          )}
        </div>

        <div className="pt-8 text-xs text-gray-600 border-t border-white/5 flex justify-between">
          <span>STABILITY: NOMINAL</span>
          <span>SYS_TIME: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

const Hero = () => {
  const [bootComplete, setBootComplete] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [taglineText, setTaglineText] = useState("");
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';
  const containerRef = useRef(null);

  // Mouse coordinate values for hover glow tracking
  const glowX = useMotionValue(0);
  const glowY = useMotionValue(0);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    glowX.set(e.clientX - rect.left);
    glowY.set(e.clientY - rect.top);
  };

  const handleEnterSystem = () => {
    setIsEntering(true);
    
    // Play sound effect
    const warpSound = new Audio('./boss beat [sound effect].mp3');
    warpSound.volume = 0.4;
    warpSound.play().catch(e => console.log('Sound play failed:', e));

    setTimeout(() => {
      navigate('/home');
    }, 2200);
  };

  // Typing effect logic for Dev role description
  const fullDescriptionText = "MERN Full Stack Developer building highly interactive, premium user interfaces.";

  useEffect(() => {
    if (!bootComplete) return;
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullDescriptionText.length) {
        setTaglineText(fullDescriptionText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 25);
    return () => clearInterval(typingInterval);
  }, [bootComplete]);

  return (
    <>
      <AnimatePresence>
        {!bootComplete && (
          <motion.div key="boot" exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}>
            <BootScreen onComplete={() => setBootComplete(true)} />
          </motion.div>
        )}
      </AnimatePresence>

      <section 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative h-screen w-full flex items-center justify-center overflow-hidden scan-line-overlay select-none"
      >
        {/* Glow movement behind panels */}
        <motion.div 
          className="pointer-events-none absolute -inset-px opacity-40 z-0 hidden md:block"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                500px circle at ${glowX}px ${glowY}px,
                ${isDark ? 'rgba(0, 255, 255, 0.12)' : 'rgba(37, 99, 235, 0.05)'},
                transparent 85%
              )
            `
          }}
        />

        {/* Warp speed laser animation overlay when system entry is pressed */}
        <AnimatePresence>
          {isEntering && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0.4, 0.9, 0], scale: [1, 1.15, 0.95, 1.05, 1] }}
              transition={{ duration: 0.4, repeat: Infinity }}
              className={`absolute inset-0 z-40 mix-blend-overlay pointer-events-none ${isDark ? 'bg-cyan-500' : 'bg-blue-600'}`}
            />
          )}
        </AnimatePresence>

        {/* Laser line & Starfield background supplied by persistent global Background */}

        {/* HUD SIDE WIDGET: Left metrics */}
        {bootComplete && (
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className={`hidden xl:flex flex-col gap-4 absolute left-4 xl:left-8 top-[28%] xl:top-1/4 p-5 rounded-r-xl border-l-4 ${
              isDark ? 'bg-black/65 border-neon-cyan glass-panel shadow-[0_0_15px_rgba(0,255,255,0.05)]' : 'bg-white/85 border-blue-600 shadow-md'
            } z-20 w-56 xl:w-64`}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Cpu className={`w-4 h-4 ${isDark ? 'text-neon-cyan animate-pulse' : 'text-blue-600'}`} />
              <span className="font-orbitron font-bold text-xs tracking-wider">HARDWARE METRICS</span>
            </div>
            <div className="space-y-3 font-mono text-[11px] text-gray-400">
              <div className="flex justify-between">
                <span>STABILITY:</span>
                <span className="text-neon-cyan text-glow-cyan">99.86%</span>
              </div>
              <div className="flex justify-between">
                <span>CORE LOAD:</span>
                <span className="text-neon-purple">12.5%</span>
              </div>
              <div className="flex justify-between">
                <span>UPLINK SPEED:</span>
                <span>842 MB/S</span>
              </div>
              <div className="pt-2">
                <div className="flex justify-between mb-1">
                  <span>MEM BUFFER:</span>
                  <span>72%</span>
                </div>
                <div className="w-full bg-gray-800 h-1.5 rounded overflow-hidden">
                  <motion.div 
                    animate={{ width: ["40%", "72%", "50%", "72%"] }} 
                    transition={{ repeat: Infinity, duration: 4 }} 
                    className="bg-neon-cyan h-full"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* HUD SIDE WIDGET: Right security check */}
        {bootComplete && (
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className={`hidden xl:flex flex-col gap-4 absolute right-4 xl:right-8 top-[28%] xl:top-1/4 p-5 rounded-l-xl border-r-4 ${
              isDark ? 'bg-black/65 border-neon-purple glass-panel shadow-[0_0_15px_rgba(188,19,254,0.05)]' : 'bg-white/85 border-pink-600 shadow-md'
            } z-20 w-56 xl:w-64`}
          >
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <ShieldCheck className={`w-4 h-4 ${isDark ? 'text-neon-purple' : 'text-pink-600'}`} />
              <span className="font-orbitron font-bold text-xs tracking-wider">SECURITY PORTALS</span>
            </div>
            <div className="space-y-3 font-mono text-[11px] text-gray-400">
              <div className="flex items-center gap-2">
                <Activity className="w-3.5 h-3.5 text-neon-cyan" />
                <span>FIREWALL STATUS: ACTIVE</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="w-3.5 h-3.5 text-neon-purple" />
                <span>DB CRYPTO: AES-256</span>
              </div>
              <div className="flex items-center gap-2">
                <Layers className="w-3.5 h-3.5 text-gray-400" />
                <span>STACK BUILD: DECRYPTED</span>
              </div>
              <div className="pt-2 flex justify-between items-center text-[10px] text-neon-cyan">
                <span className="animate-pulse">● HOST ONLINE</span>
                <span>ID: MCA_SYS_7</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Center content Dashboard */}
        {bootComplete && (
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none w-full max-w-sm sm:max-w-md md:max-w-xl lg:max-w-2xl xl:max-w-3xl 2xl:max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              style={{
                clipPath: 'polygon(0 0, calc(100% - 25px) 0, 100% 25px, 100% 100%, 25px 100%, 0 calc(100% - 25px))'
              }}
              className={`p-6 sm:p-10 md:p-12 transition-all duration-300 w-full relative ${
                isDark 
                  ? 'glass-panel box-glow shadow-[0_0_40px_rgba(0,255,255,0.05)] border-neon-cyan/25' 
                  : 'bg-white/85 backdrop-blur-md border border-gray-200 shadow-2xl'
              } ${isEntering ? 'scale-110 blur-md opacity-0 duration-1000' : 'pointer-events-auto'}`}
            >
              {/* Corner crosshairs inside the panel */}
              <div className={`absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
              <div className={`absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
              <div className={`absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />
              <div className={`absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 ${isDark ? 'border-neon-cyan' : 'border-blue-500'}`} />

              <motion.h2 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className={`font-orbitron text-xs sm:text-sm tracking-[0.4em] mb-4 uppercase ${isDark ? 'text-neon-cyan text-glow' : 'text-blue-600 font-bold'}`}
              >
                // OS_REBOOT_ESTABLISHED
              </motion.h2>
              
              <motion.h1 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6, type: "spring" }}
                className={`text-3xl sm:text-4xl md:text-5xl xl:text-7xl font-bold font-orbitron mb-6 uppercase tracking-wider ${
                  isDark ? 'text-white text-glow-cyan' : 'text-gray-900'
                }`}
              >
                SHREYAS R A
              </motion.h1>

              {/* Tagline using typing state */}
              <div className="min-h-[64px] sm:min-h-[48px] md:min-h-[32px] mb-8">
                <p className={`font-rajdhani text-base sm:text-lg md:text-xl xl:text-2xl max-w-2xl mx-auto ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                  {taglineText}
                  <span className={`inline-block w-1.5 h-4 ml-1 ${isDark ? 'bg-neon-cyan' : 'bg-blue-600'} animate-pulse`} />
                </p>
              </div>

              {/* Enter CTA Button */}
              <motion.button
                whileHover={(!isEntering && window.matchMedia("(hover: hover)").matches) ? { 
                  scale: 1.05, 
                  boxShadow: isDark ? "0 0 25px #00ffff" : "0 0 25px rgba(37,99,235,0.4)" 
                } : {}}
                whileTap={!isEntering ? { scale: 0.98 } : {}}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                onClick={handleEnterSystem}
                disabled={isEntering}
                className={`px-6 py-3 sm:px-8 sm:py-4 font-orbitron text-xs sm:text-sm font-bold tracking-[0.2em] rounded-sm uppercase transition-all duration-300 relative overflow-hidden group ${
                  isEntering 
                    ? isDark ? 'bg-neon-purple text-white border-neon-purple shadow-[0_0_15px_#bc13fe]' : 'bg-pink-600 text-white border-pink-600'
                    : isDark 
                      ? 'bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black' 
                      : 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
                }`}
              >
                {/* Diagonal sliding background glow on hover */}
                {!isEntering && (
                  <span className="absolute inset-0 w-0 bg-neon-cyan transition-all duration-300 ease-out group-hover:w-full -z-10 group-hover:opacity-10 opacity-0" />
                )}
                {isEntering ? 'ACCESS GRANTED...' : '[ Enter System ]'}
              </motion.button>
            </motion.div>
          </div>
        )}
        
        {/* Scroll indicator */}
        {bootComplete && !isEntering && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: [0, 1, 0], y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
            onClick={handleEnterSystem}
            className="absolute bottom-6 flex flex-col items-center gap-2 cursor-pointer z-10"
          >
            <span className={`font-orbitron text-[10px] tracking-widest ${isDark ? 'text-neon-cyan text-glow-cyan' : 'text-blue-600 font-bold'}`}>
              DECRYPT ENTRY
            </span>
            <ArrowDown className={`w-4 h-4 ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`} />
          </motion.div>
        )}
        
        {/* Ambient bottom monitor light beam */}
        {bootComplete && !isEntering && (
          <div className={`absolute bottom-0 left-0 w-full h-24 z-0 bg-gradient-to-t ${isDark ? 'from-neon-purple/15' : 'from-blue-600/5'} to-transparent pointer-events-none`}></div>
        )}
      </section>
    </>
  );
};

export default Hero;
