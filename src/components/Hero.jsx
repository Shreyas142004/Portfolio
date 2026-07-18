import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const roles = [
  'MERN Stack Developer',
  'React Developer',
  'Backend Developer',
  'UI Designer',
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const cardRef = useRef(null);
  
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const rotateZ = useMotionValue(0);
  
  const springConfig = { stiffness: 150, damping: 20, mass: 1 };
  const smoothRotateX = useSpring(rotateX, springConfig);
  const smoothRotateY = useSpring(rotateY, springConfig);
  const smoothRotateZ = useSpring(rotateZ, { stiffness: 100, damping: 15, mass: 1.5 });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        const distX = e.clientX - centerX;
        const distY = e.clientY - centerY;
        
        const distance = Math.sqrt(distX * distX + distY * distY);
        
        // 3D Tilt effect
        const maxTilt = 20; // max degrees for X/Y
        
        // Pendulum Swing effect (Z)
        if (distance < 500) {
          const pushStrength = (500 - distance) / 500; // 0 to 1
          const maxSwing = 15; // max degrees for pendulum swing
          const sign = distX < 0 ? 1 : -1;
          
          rotateZ.set(sign * pushStrength * maxSwing);
          rotateX.set((distY / (rect.height / 2)) * -maxTilt * pushStrength);
          rotateY.set((distX / (rect.width / 2)) * maxTilt * pushStrength);
        } else {
          // Return to rest position
          rotateZ.set(0);
          rotateX.set(0);
          rotateY.set(0);
        }
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 md:pt-20"
    >
      {/* Mouse Follow Glow */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 w-[40vw] h-[40vw] rounded-full bg-accent/10 blur-[100px] z-0"
        animate={{
          x: mousePosition.x - window.innerWidth * 0.2,
          y: mousePosition.y - window.innerWidth * 0.2,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      />

      {/* Floating Particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-accent/40 rounded-full z-0"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            y: [null, Math.random() * window.innerHeight],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      <div className="container mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-12 items-center">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <h2 className="text-xl md:text-2xl font-medium text-black/60 dark:text-white/60 mb-2">
            Hello, I'm
          </h2>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            Shreyas R A
          </h1>

          <div className="h-12 mb-8">
            <motion.p
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-2xl md:text-3xl font-semibold text-accent"
            >
              {roles[currentRole]}
            </motion.p>
          </div>

          <p className="text-lg text-black/70 dark:text-white/70 max-w-lg mb-10 leading-relaxed">
            MCA Student • Full Stack MERN Developer
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="#projects"
              className="px-8 py-4 bg-accent text-black font-semibold rounded-full hover:bg-yellow-500 transition-colors transform hover:scale-105 active:scale-95 flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.3)]"
            >
              View Projects
            </a>
            <a
              href="/Shreyas-Resume.pdf"
              download
              className="px-8 py-4 bg-white/5 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 font-semibold rounded-full hover:bg-black/5 dark:hover:bg-white/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Side Image (ID Card) */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          className="relative flex justify-center lg:justify-center lg:pl-12 perspective-[2000px]"
        >
          {/* Static Container */}
          <div className="relative pt-32 lg:pt-0"> {/* Added pt-32 on mobile to account for the top-40 lanyard */}
            <div 
              className="relative w-56 sm:w-64 md:w-80 aspect-[3/4] z-20 group mx-auto"
            >
              {/* Premium Lanyard */}
              <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 flex flex-col items-center z-0">
                {/* Lanyard Fabric */}
                <div className="w-5 h-24 bg-gradient-to-b from-[#111] to-[#222] dark:from-[#050505] dark:to-[#111] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]"></div>
                {/* Metallic Clip */}
                <div className="w-8 h-10 -mt-2 bg-gradient-to-b from-gray-400 via-gray-200 to-gray-500 rounded-sm shadow-xl flex items-center justify-center relative">
                  <div className="w-4 h-6 border-2 border-gray-600 rounded-full absolute -bottom-4"></div>
                </div>
              </div>
              
              {/* Card Body - Luxury Black in dark, White in light */}
              <div className="absolute inset-0 bg-white dark:bg-[#0a0a0a] rounded-[1.5rem] border border-black/10 dark:border-white/20 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col z-10 pt-4 px-4 pb-8 items-center">
                 
                 {/* Vignette Overlay */}
                 <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-20"></div>
                 
                 {/* ID Photo */}
                 <div className="w-full h-full flex-1 rounded-[1rem] overflow-hidden relative border border-white/10 bg-black z-10">
                   <img
                      src="/Profile.png"
                      alt="Shreyas R A"
                      className="w-full h-full object-cover filter grayscale contrast-125 brightness-90"
                   />
                 </div>
                 
                 {/* ID Details (Minimalist) */}
                 <div className="w-full mt-6 text-center z-10">
                   <h3 className="font-medium text-lg md:text-xl uppercase tracking-[0.2em] text-black dark:text-white" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                     Shreyas R A
                   </h3>
                 </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
