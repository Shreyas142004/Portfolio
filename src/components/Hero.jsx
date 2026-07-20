import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

const roles = [
  'MERN Stack Developer',
  'React Developer',
  'Backend Developer',
  'UI Designer',
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Drag physics for elastic strap
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Calculate strap height dynamically based on drag distance
  const strapHeight = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    const dx = x;
    const dy = y + 800; // Base distance is 800px (top-[800px])
    return Math.max(0, Math.sqrt(dx * dx + dy * dy));
  });

  // Calculate strap rotation so it always points to the card
  const strapRotate = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    const dx = x;
    const dy = y + 800;
    return `${-Math.atan2(dx, dy)}rad`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handlePointerMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section id="home" className="relative flex justify-center items-center pt-24 md:pt-20 min-h-screen overflow-hidden">
      {/* Mouse Follow Glow */}
      <motion.div
        className="top-0 left-0 z-0 fixed bg-accent/15 dark:bg-accent/10 blur-[120px] rounded-full w-[35vw] h-[35vw] pointer-events-none"
        animate={{
          x: mousePosition.x - window.innerWidth * 0.175,
          y: mousePosition.y - window.innerWidth * 0.175,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.6 }}
      />

      <div className="relative items-center gap-16 lg:gap-12 grid grid-cols-1 lg:grid-cols-2 mx-auto px-6 container">
        
        {/* Left Side Content */}
        <div className="flex flex-col items-center lg:items-start order-2 lg:order-1 lg:pl-12 xl:pl-24 lg:text-left text-center w-full">
          
          {/* Text Container with mix-blend-difference */}
          <div
            className="z-40 relative mix-blend-difference text-white w-full flex flex-col items-center lg:items-start"
          >
            <div className="overflow-hidden">
              <h2 className="mb-2 font-medium text-white/50 text-sm md:text-base tracking-[0.3em] uppercase">
                Hello, I'm
              </h2>
            </div>
            
            <div className="overflow-hidden">
              <h1 className="mb-4 font-bold text-5xl md:text-7xl lg:text-8xl tracking-tighter">
                Shreyas R A
              </h1>
            </div>

            <div className="mb-8 h-12 overflow-hidden">
              <p className="font-medium text-white/80 text-2xl md:text-3xl tracking-tight">
                {roles[currentRole]}
              </p>
            </div>

            <p className="mx-auto lg:mx-0 max-w-lg text-white/60 text-lg md:text-xl font-light leading-relaxed">
              Crafting elegant, high-performance web experiences with modern architecture and minimal design.
            </p>
          </div>

          {/* Buttons Container (Normal blending) */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="z-40 relative flex flex-wrap justify-center lg:justify-start gap-6 w-full mt-12"
          >
            <motion.a
              variants={itemVariants}
              href="#projects"
              className="group relative flex justify-center items-center bg-accent px-8 py-4 rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95"
            >
              <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative font-medium text-white dark:text-black">View Projects</span>
            </motion.a>
            <motion.a
              variants={itemVariants}
              href="/Shreyas-Resume.pdf"
              download
              className="group relative flex justify-center items-center bg-transparent backdrop-blur-md px-8 py-4 border border-black/10 dark:border-white/10 hover:border-accent dark:hover:border-accent rounded-full transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-[0_0_20px_rgba(var(--accent),0.2)]"
            >
              <span className="font-medium text-black dark:text-white group-hover:text-accent transition-colors duration-300">Download Resume</span>
            </motion.a>
          </motion.div>

        </div>

        {/* Right Side Image (ID Card) */}
        <motion.div
          initial={{ opacity: 0, y: -200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 15, mass: 1 }}
          className="relative flex justify-center lg:justify-center order-1 lg:order-2 lg:pl-12 perspective-[2000px]"
        >
          {/* Interactive Card Container */}
          <div className="relative mx-auto mt-32 lg:mt-0 w-56 sm:w-64 md:w-80 perspective-[2000px]">
            
            {/* Anchor Point: 800px above the card */}
            <div className="-top-[800px] left-1/2 z-0 absolute w-0 h-0">
              <motion.div
                className="flex flex-col items-center origin-top"
                style={{
                  height: strapHeight,
                  rotate: strapRotate,
                  x: "-50%"
                }}
              >
                {/* Lanyard Fabric */}
                <div className="relative flex-1 bg-gradient-to-b from-[#111] dark:from-[#050505] to-[#222] dark:to-[#111] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] w-8 overflow-hidden">
                  <svg viewBox="0 0 32 760" preserveAspectRatio="none" className="absolute inset-0 opacity-60 dark:opacity-40 w-full h-full">
                    <defs>
                      <pattern id="lanyard-pattern" patternUnits="userSpaceOnUse" width="32" height="64">
                        <text
                          x="16"
                          y="32"
                          textAnchor="middle"
                          dominantBaseline="central"
                          transform="rotate(-45, 16, 32)"
                          fill="#ffffff"
                          fontSize="11"
                          fontWeight="900"
                          letterSpacing="1"
                          style={{ textShadow: "0px 1px 2px rgba(0,0,0,0.8)" }}
                        >
                          SHREYAS
                        </text>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#lanyard-pattern)" />
                  </svg>
                </div>
                {/* Metallic Clip */}
                <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-400 via-gray-200 to-gray-500 shadow-xl -mt-2 rounded-sm w-10 h-10 shrink-0">
                  <div className="-bottom-4 absolute border-2 border-gray-600 rounded-full w-5 h-6"></div>
                </div>
              </motion.div>
            </div>

            {/* Draggable Card */}
            <motion.div
              ref={cardRef}
              drag
              dragSnapToOrigin={true}
              dragElastic={0.4}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
              whileDrag={{ cursor: "grabbing" }}
              style={{ x: dragX, y: dragY }}
              className="z-20 relative w-full aspect-[3/4] origin-top touch-none cursor-grab"
            >
              {/* Card Body - Luxury Black in dark, White in light */}
              <div className="group z-10 absolute inset-0 flex flex-col items-center bg-white dark:bg-[#0a0a0a] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] px-4 pt-4 pb-8 border border-black/10 dark:border-white/20 rounded-[1.5rem] overflow-hidden">
                {/* Vignette Overlay */}
                <div className="z-20 absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.05)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

                {/* ID Photo */}
                <div className="z-10 relative flex-1 bg-black border border-black/10 dark:border-white/10 rounded-[1rem] w-full h-full overflow-hidden">
                  <img
                    src="/Profile.png"
                    alt="Shreyas R A"
                    className="brightness-95 grayscale w-full h-full object-cover filter contrast-125"
                  />
                </div>

                {/* ID Details */}
                <div className="z-10 mt-6 w-full text-center pointer-events-none">
                  <h3 className="font-semibold text-black dark:text-white text-lg md:text-xl uppercase tracking-[0.2em]" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                    Shreyas R A
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-[0.4em] font-medium">Scroll</span>
        <div className="w-[1px] h-16 bg-black/10 dark:bg-white/10 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full h-1/3 bg-accent"
            animate={{ y: [0, 64, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
