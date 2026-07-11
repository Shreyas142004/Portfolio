import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars, Float, MeshDistortMaterial } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTheme } from './ThemeContext';

const CyberObject = ({ isEntering, theme }) => {
  const meshRef = useRef();
  
  const mainColor = theme === 'dark' ? '#00ffff' : '#2563eb';
  const coreColor = theme === 'dark' ? '#bc13fe' : '#db2777';

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const speedMultiplier = isEntering ? 15 : 1;
    meshRef.current.rotation.x = (Math.cos(t / 4) / 2) * speedMultiplier;
    meshRef.current.rotation.y = (Math.sin(t / 4) / 2) * speedMultiplier;
    meshRef.current.rotation.z = (Math.sin(t / 1.5) / 2) * speedMultiplier;
    
    if (isEntering) {
      meshRef.current.scale.x = 1.5 + Math.sin(t * 20) * 0.2;
      meshRef.current.scale.y = 1.5 + Math.cos(t * 20) * 0.2;
      meshRef.current.scale.z = 1.5 + Math.sin(t * 20) * 0.2;
    }
  });

  return (
    <Float speed={isEntering ? 10 : 2} rotationIntensity={isEntering ? 5 : 1} floatIntensity={isEntering ? 5 : 2}>
      <mesh ref={meshRef} scale={1.5}>
        <icosahedronGeometry args={[1, isEntering ? 0 : 1]} />
        <MeshDistortMaterial
          color={mainColor}
          attach="material"
          distort={isEntering ? 0.8 : 0.4}
          speed={isEntering ? 10 : 2}
          roughness={0.2}
          metalness={0.8}
          wireframe
        />
      </mesh>
      
      <mesh scale={0.8}>
         <sphereGeometry args={[1, 32, 32]} />
         <meshStandardMaterial color={coreColor} emissive={coreColor} emissiveIntensity={isEntering ? 5 : 2} toneMapped={false} />
      </mesh>
    </Float>
  );
};

const Hero = () => {
  const [isEntering, setIsEntering] = useState(false);
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  const handleEnterSystem = () => {
    setIsEntering(true);
    
    // Play sound effect
    const warpSound = new Audio('./boss beat [sound effect].mp3');
    warpSound.volume = 0.5;
    warpSound.play().catch(e => console.log('Sound play failed:', e));

    setTimeout(() => {
      navigate('/home');
    }, 2500);
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Glitch Overlay */}
      <AnimatePresence>
        {isEntering && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0, 0.8, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className={`absolute inset-0 z-40 mix-blend-overlay pointer-events-none ${isDark ? 'bg-white' : 'bg-black'}`}
          />
        )}
      </AnimatePresence>

      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, isEntering ? 2 : 5], fov: 45 }}>
          <ambientLight intensity={isDark ? 0.5 : 1} />
          <directionalLight position={[10, 10, 10]} intensity={1} />
          <pointLight position={[-10, -10, -10]} intensity={0.5} color={isDark ? "#00f3ff" : "#2563eb"} />
          <Stars 
            radius={100} 
            depth={50} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={isEntering ? 20 : 1} 
            color={isDark ? "white" : "black"} 
          />
          <CyberObject isEntering={isEntering} theme={theme} />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={isEntering ? 50 : 0.5} />
        </Canvas>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className={`p-8 md:p-12 rounded-2xl max-w-3xl pointer-events-auto transition-all ${
            isDark 
              ? 'glass-panel box-glow' 
              : 'bg-white/80 backdrop-blur-md border border-gray-200 shadow-2xl'
          } ${isEntering ? 'scale-110 blur-sm opacity-0 duration-1000' : ''}`}
        >
          <motion.h2 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className={`font-orbitron text-lg md:text-xl tracking-[0.3em] mb-4 ${isDark ? 'text-neon-cyan' : 'text-blue-600'}`}
          >
            SYSTEM INITIALIZED
          </motion.h2>
          
          <motion.h1 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2, type: "spring" }}
            className={`text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold font-orbitron mb-6 ${isDark ? 'text-white text-glow' : 'text-gray-900'}`}
          >
            SHREYAS R A
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className={`font-rajdhani text-xl md:text-2xl mb-8 max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
          >
            MERN Full Stack Developer & <span className={isDark ? "text-neon-purple" : "text-pink-600 font-bold"}>3D Web Engineer</span> building immersive digital experiences.
          </motion.p>

          <motion.button
            whileHover={(!isEntering && window.matchMedia("(hover: hover)").matches) ? { scale: 1.05, boxShadow: isDark ? "0 0 20px #00ffff" : "0 0 20px rgba(37,99,235,0.5)" } : {}}
            whileTap={!isEntering ? { scale: 0.95 } : {}}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.2 }}
            onClick={handleEnterSystem}
            disabled={isEntering}
            className={`px-8 py-4 font-orbitron font-bold tracking-widest rounded uppercase transition-all duration-300 ${
              isEntering 
                ? isDark ? 'bg-neon-purple text-white border-neon-purple' : 'bg-pink-600 text-white border-pink-600'
                : isDark 
                  ? 'bg-transparent border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-black' 
                  : 'bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            {isEntering ? 'ACCESS GRANTED...' : 'Enter System'}
          </motion.button>
        </motion.div>
      </div>
      
      {!isEntering && (
        <div className={`absolute bottom-0 left-0 w-full h-32 z-0 bg-gradient-to-t ${isDark ? 'from-neon-purple/20' : 'from-blue-600/10'} to-transparent`}></div>
      )}
    </section>
  );
};

export default Hero;
