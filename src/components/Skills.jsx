import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'Vite', 'JavaScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'],
  },
  {
    category: 'Backend',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Authentication', 'Nodemailer', 'Multer'],
  },
  {
    category: 'Database',
    skills: ['MongoDB', 'MongoDB Atlas', 'MySQL'],
  },
  {
    category: 'Programming Languages',
    skills: ['Java', 'Python', 'JavaScript', 'C'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Render', 'Netlify', 'Vercel', 'XAMPP', 'FFmpeg'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};

const Skills = () => {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-6 mb-16 md:mb-24"
        >
          <span className="text-accent font-mono text-sm tracking-widest uppercase">02.</span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Skills & Tech</h2>
          <div className="h-[1px] flex-1 bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((category, idx) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative bg-white/5 dark:bg-white/5 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-[2rem] p-8 transition-all duration-500 hover:border-accent/40 shadow-lg hover:shadow-[0_20px_40px_-15px_rgba(var(--accent),0.3)]"
            >
              {/* Internal Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/10 group-hover:to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700 rounded-[2rem] pointer-events-none"></div>
              
              <h3 className="text-xl font-semibold mb-8 text-black dark:text-white flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-accent"></span>
                {category.category}
              </h3>
              
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="flex flex-wrap gap-3 relative z-10"
              >
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="px-4 py-2 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-xl text-sm font-medium border border-transparent hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(var(--accent),0.2)] transition-all cursor-default text-black/70 dark:text-white/70"
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute bottom-1/4 left-0 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none -translate-x-1/2"></div>
    </section>
  );
};

export default Skills;
