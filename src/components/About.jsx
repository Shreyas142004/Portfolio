import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-16 md:mb-24"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">01.</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">About Me</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Image/Visual */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:col-span-5 relative group perspective-[1000px]"
          >
            <div className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden transition-transform duration-700 ease-out group-hover:rotate-y-[5deg] group-hover:rotate-x-[5deg]">
              <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10 transition-opacity duration-500 group-hover:opacity-0 pointer-events-none" />
              <img 
                src="/Profile.png" 
                alt="About Shreyas" 
                className="w-full h-full object-cover grayscale brightness-75 contrast-125 transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-90"
              />
              <div className="absolute inset-0 border border-black/10 dark:border-white/10 rounded-[2rem] z-20 pointer-events-none" />
            </div>
            
            {/* Abstract Decorative Elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border border-accent/30 rounded-full blur-[2px] animate-[spin_10s_linear_infinite] -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 border border-black/10 dark:border-white/10 rounded-full blur-[1px] -z-10" />
          </motion.div>

          {/* Right Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="lg:col-span-7 space-y-8"
          >
            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-black/90 dark:text-white/90 leading-snug">
              I am a passionate Full Stack Developer currently pursuing my <span className="text-accent font-medium">Master of Computer Applications (MCA)</span>.
            </h3>
            
            <div className="space-y-6 text-lg text-black/60 dark:text-white/60 font-light leading-relaxed">
              <p>
                My journey is driven by a deep fascination with how technology can solve complex problems. From designing modern, responsive user interfaces to architecting secure backend APIs, I thrive on pushing the boundaries of what's possible on the web.
              </p>
              <p>
                I specialize in building robust, scalable web applications using the MERN stack and delivering seamless, intuitive user experiences that blend luxury design with high-performance engineering.
              </p>
            </div>

            <div className="pt-8">
              <h4 className="text-xs uppercase tracking-[0.3em] text-black/40 dark:text-white/40 mb-6 font-semibold">Core Focus</h4>
              <div className="flex flex-wrap gap-4">
                {['Frontend Architecture', 'Backend Systems', 'UI/UX Design', 'MERN Stack', 'Performance'].map((item) => (
                  <span 
                    key={item} 
                    className="px-6 py-3 bg-black/5 dark:bg-white/5 backdrop-blur-sm border border-black/10 dark:border-white/10 rounded-full text-sm font-medium hover:border-accent dark:hover:border-accent hover:text-accent hover:-translate-y-1 transition-all duration-300 cursor-default shadow-sm hover:shadow-[0_4px_20px_rgba(var(--accent),0.15)]"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none"></div>
    </section>
  );
};

export default About;
