import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiExternalLink } from 'react-icons/fi';

const projects = [
  {
    title: 'Speech-to-Text AI Assistant',
    description: 'Built a speech recognition application using React, Node.js, Express, Python, and OpenAI Whisper capable of converting audio into text with multilingual support. Includes recording, audio upload, translation, and transcription history.',
    tech: ['React', 'Node.js', 'Express', 'Python', 'Whisper'],
    github: 'https://github.com/Shreyas142004/Speech-to-Text.git',
    live: 'https://speech-to-text-eight-mu.vercel.app/',
    image: '/Speech-to-Text AI Assistant.png',
  },
  {
    title: 'Smart CRM System',
    description: 'Role-based CRM platform with Admin, Sales, and Technical dashboards. Features lead management, task assignment, email notifications, authentication, analytics, and workflow tracking.',
    tech: ['React', 'Node', 'MongoDB', 'Express', 'JWT'],
    github: 'https://github.com/Shreyas142004/Smart-CRM.git',
    live: '#',
    image: '/Smart CRM.png',
  },
  {
    title: 'Parking Booking System',
    description: 'MERN application allowing users to register, log in, reserve parking slots, and manage bookings using JWT authentication and MongoDB.',
    tech: ['React', 'Node', 'Express', 'MongoDB', 'JWT'],
    github: 'https://github.com/Shreyas142004/Smart-Parking-Portal.git',
    live: '#',
    image: '/Parking Booking System.png',
  },
  {
    title: 'Smart College Utility Portal',
    description: 'A dedicated college portal where lecturers can upload student details including attendance, results, assignments, and notices, while students can securely log in to view their respective academic records.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB'],
    github: 'https://github.com/Shreyas142004/Smart-Utility-Portal.git',
    live: '#',
    image: '/Smart College Utility Portal.png',
  },
  {
    title: 'ATM Simulation System',
    description: 'A desktop ATM simulation application built in C programming using structs for state management. Features a graphical user interface (GUI) for banking operations like withdrawals, deposits, and balance checks.',
    tech: ['C Programming', 'Structs', 'GUI'],
    github: 'https://github.com/Shreyas142004/ATM-simulation-C.git',
    live: '#',
    image: '/ATM Simulation System.png',
  }
];

const Projects = () => {
  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-16 md:mb-24"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">03.</span>
          <h2 className="font-bold text-3xl md:text-5xl tracking-tight">Featured Projects</h2>
          <div className="flex-1 bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent mt-2 h-[1px]"></div>
        </motion.div>

        <div className="gap-8 lg:gap-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -12 }}
              className="group flex flex-col bg-white/5 dark:bg-white/5 backdrop-blur-xl hover:shadow-[0_30px_60px_-15px_rgba(var(--accent),0.3)] border border-black/10 dark:border-white/10 hover:border-accent/50 rounded-[2rem] overflow-hidden transition-all duration-500 relative"
            >
              {/* Internal Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 pointer-events-none z-0"></div>

              {/* Project Image */}
              <div className="relative h-64 overflow-hidden z-10">
                <div className="z-10 absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors duration-500"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out transform"
                />
              </div>

              {/* Project Content */}
              <div className="flex flex-col flex-1 p-8 z-10 relative">
                <h3 className="mb-4 font-bold group-hover:text-accent text-2xl transition-colors text-black dark:text-white">
                  {project.title}
                </h3>
                <p className="flex-1 mb-8 text-black/60 dark:text-white/60 text-sm font-light leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(tech => (
                    <span key={tech} className="bg-black/5 dark:bg-white/5 backdrop-blur-md px-4 py-1.5 border border-black/10 dark:border-white/10 rounded-full font-medium text-black/70 dark:text-white/70 text-xs">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links - Slide up on hover */}
                <div className="flex items-center gap-4 mt-auto pt-6 border-black/10 dark:border-white/10 border-t overflow-hidden">
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 font-medium hover:text-accent text-sm transition-all duration-300 transform group-hover:translate-y-0 opacity-80 group-hover:opacity-100"
                  >
                    <FiGithub size={18} />
                    Code
                  </a>
                  {project.live !== '#' && (
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 ml-auto font-medium hover:text-accent text-sm transition-all duration-300 transform group-hover:translate-y-0 opacity-80 group-hover:opacity-100"
                    >
                      <FiExternalLink size={18} />
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/4 right-0 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none translate-x-1/2"></div>
    </section>
  );
};

export default Projects;
