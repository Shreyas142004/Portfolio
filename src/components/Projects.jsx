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
    <section id="projects" className="relative py-24 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-bold text-4xl md:text-5xl">Featured Projects</h2>
            <div className="flex-1 bg-black/10 dark:bg-white/10 mt-2 h-px"></div>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                className="group flex flex-col bg-white dark:bg-[#0a0a0a] hover:shadow-[0_20px_40px_rgba(250,204,21,0.1)] border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden transition-all duration-300"
              >
                {/* Project Image */}
                <div className="relative h-60 overflow-hidden">
                  <div className="z-10 absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out transform"
                  />
                  {/* Floating Tech Badges on Image (optional, maybe too crowded, let's put them below) */}
                </div>

                {/* Project Content */}
                <div className="flex flex-col flex-1 p-8">
                  <h3 className="mb-3 font-bold group-hover:text-accent text-2xl transition-colors">
                    {project.title}
                  </h3>
                  <p className="flex-1 mb-6 text-black/70 dark:text-white/70 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {project.tech.map(tech => (
                      <span key={tech} className="bg-black/5 dark:bg-white/5 px-3 py-1 border border-black/5 dark:border-white/5 rounded-full font-semibold text-black/80 dark:text-white/80 text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 mt-auto pt-4 border-black/5 dark:border-white/5 border-t">
                    <a 
                      href={project.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 font-medium hover:text-accent text-sm transition-colors"
                    >
                      <FiGithub size={18} />
                      Code
                    </a>
                    <a 
                      href={project.live} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 ml-auto font-medium hover:text-accent text-sm transition-colors"
                    >
                      <FiExternalLink size={18} />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
