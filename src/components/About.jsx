import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-bold">About Me</h2>
            <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10 mt-2"></div>
          </div>

          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              
              {/* Left Column */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Name</h3>
                  <p className="text-2xl font-medium">Shreyas R A</p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-black/50 dark:text-white/50 mb-2">Education</h3>
                  <p className="text-lg text-black/80 dark:text-white/80">Master of Computer Applications (MCA)</p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-widest text-black/50 dark:text-white/50 mb-3">Passionate About</h3>
                  <div className="flex flex-wrap gap-2">
                    {['Frontend Development', 'Backend Development', 'MERN Stack', 'REST APIs', 'Modern UI'].map((item) => (
                      <span key={item} className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-full text-sm font-medium hover:border-accent hover:text-accent transition-colors cursor-default">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-black/50 dark:text-white/50 mb-4">Professional Summary</h3>
                <div className="space-y-4 text-lg text-black/70 dark:text-white/70 leading-relaxed">
                  <p>
                    I am a passionate Full Stack Developer currently pursuing my Master of Computer Applications (MCA). I specialize in building robust, scalable web applications using the MERN stack and delivering seamless user experiences.
                  </p>
                  <p>
                    My journey is driven by a deep fascination with how technology can solve complex problems. From designing modern, responsive user interfaces to architecting secure backend APIs, I thrive on pushing the boundaries of what's possible on the web.
                  </p>
                  <p>
                    I'm dedicated to continuous learning, always exploring the latest frameworks and tools to deliver premium digital experiences.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-accent/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
    </section>
  );
};

export default About;
