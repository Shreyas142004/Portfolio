import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const roles = [
  'MERN Stack Developer',
  'React Developer',
  'Backend Developer',
  'UI Designer',
];

const Hero = () => {
  const [currentRole, setCurrentRole] = useState(0);
  const cardRef = useRef(null);

  // Drag physics for elastic strap
  const dragX = useMotionValue(0);
  const dragY = useMotionValue(0);

  // Calculate the perfect pendulum angle based on drag position
  const dragRotateZ = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    const dx = x;
    const dy = y + 800; // Base distance to anchor
    const angleRad = -Math.atan2(dx, dy);
    return angleRad * (180 / Math.PI);
  });

  // Calculate strap height and rotation dynamically based on drag distance
  const strapHeight = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    const dx = x;
    const dy = y + 800; // Base distance is 800px (top-[800px])
    return Math.max(0, Math.sqrt(dx * dx + dy * dy));
  });

  const strapRotate = useTransform(() => {
    const x = dragX.get();
    const y = dragY.get();
    const dx = x;
    const dy = y + 800;
    // In CSS, positive rotation is clockwise.
    // atan2(dx, dy) gives the angle from the positive Y axis.
    return `${-Math.atan2(dx, dy)}rad`;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Only track mouse for the background glow effect
    if (!window.matchMedia("(hover: hover)").matches) return;

    const handlePointerMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('pointermove', handlePointerMove);
    return () => window.removeEventListener('pointermove', handlePointerMove);
  }, []);

  return (
    <section
      id="home"
      className="relative flex justify-center items-center pt-24 md:pt-20 min-h-screen overflow-hidden"
    >
      {/* Mouse Follow Glow */}
      <motion.div
        className="top-0 left-0 z-0 fixed bg-accent/10 blur-[100px] rounded-full w-[40vw] h-[40vw] pointer-events-none"
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
          className="z-0 absolute bg-accent/40 rounded-full w-1.5 h-1.5"
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

      <div className="z-10 relative items-center gap-16 lg:gap-12 grid grid-cols-1 lg:grid-cols-2 mx-auto px-6 container">
        {/* Left Side Content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="z-30 relative flex flex-col items-center lg:items-start order-2 lg:order-1 lg:pl-12 xl:pl-24 lg:text-left text-center"
        >
          <h2 className="mb-2 font-medium text-black/60 dark:text-white/60 text-xl md:text-2xl">
            Hello, I'm
          </h2>
          <h1 className="mb-6 font-bold text-5xl md:text-7xl tracking-tight">
            Shreyas R A
          </h1>

          <div className="mb-8 h-12">
            <motion.p
              key={currentRole}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="font-semibold text-accent text-2xl md:text-3xl"
            >
              {roles[currentRole]}
            </motion.p>
          </div>

          <p className="mx-auto lg:mx-0 mb-10 max-w-lg text-black/70 dark:text-white/70 text-lg leading-relaxed">
            MCA Student • Full Stack MERN Developer
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 w-full">
            <a
              href="#projects"
              className="flex justify-center items-center bg-accent hover:opacity-90 shadow-lg px-8 py-4 rounded-full font-semibold text-white dark:text-black hover:scale-105 active:scale-95 transition-all transform"
            >
              View Projects
            </a>
            <a
              href="/Shreyas-Resume.pdf"
              download
              className="flex justify-center items-center bg-white/5 hover:bg-black/5 dark:bg-white/10 dark:hover:bg-white/20 backdrop-blur-sm px-8 py-4 border border-black/10 dark:border-white/10 rounded-full font-semibold hover:scale-105 active:scale-95 transition-all transform"
            >
              Download Resume
            </a>
          </div>
        </motion.div>

        {/* Right Side Image (ID Card) */}
        <motion.div
          initial={{ opacity: 0, y: -500 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 120, damping: 12, mass: 1.2 }}
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
                  </svg>                </div>
                {/* Metallic Clip */}
                <div className="relative flex justify-center items-center bg-gradient-to-b from-gray-400 via-gray-200 to-gray-500 shadow-xl -mt-2 rounded-sm w-10 h-10 shrink-0">
                  <div className="-bottom-4 absolute border-2 border-gray-600 rounded-full w-5 h-6"></div>
                </div>
              </motion.div>
            </div>

            <motion.div
              ref={cardRef}
              drag
              dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
              dragElastic={0.8}
              dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
              whileDrag={{ cursor: "grabbing" }}
              style={{ x: dragX, y: dragY, rotateZ: dragRotateZ }}
              className="z-20 relative w-full aspect-[3/4] origin-top touch-none cursor-grab"
            >
              {/* Card Body - Luxury Black in dark, White in light */}
              <div className="group z-10 absolute inset-0 flex flex-col items-center bg-white dark:bg-[#0a0a0a] shadow-[0_20px_50px_-10px_rgba(0,0,0,0.4)] dark:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] px-4 pt-4 pb-8 border border-black/10 dark:border-white/20 rounded-[1.5rem] overflow-hidden">

                {/* Vignette Overlay */}
                <div className="z-20 absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.1)_100%)] dark:bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] group-hover:opacity-50 transition-opacity duration-300 pointer-events-none"></div>

                {/* ID Photo */}
                <div className="z-10 relative flex-1 bg-black border border-white/10 rounded-[1rem] w-full h-full overflow-hidden">
                  <img
                    src="/Profile.png"
                    alt="Shreyas R A"
                    className="brightness-90 grayscale w-full h-full object-cover filter contrast-125"
                  />
                </div>

                {/* ID Details (Minimalist) */}
                <div className="z-10 mt-6 w-full text-center pointer-events-none">
                  <h3 className="font-medium text-black dark:text-white text-lg md:text-xl uppercase tracking-[0.2em]" style={{ fontFamily: '"Inter", "Helvetica Neue", sans-serif' }}>
                    Shreyas R A
                  </h3>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
