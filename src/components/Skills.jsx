import React from 'react';
import { motion } from 'framer-motion';

const skillsData = [
  {
    category: 'Frontend',
    skills: ['React', 'Vite', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Responsive Design'],
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
    skills: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C'],
  },
  {
    category: 'Tools & Platforms',
    skills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Cloudflare', 'Render', 'Netlify', 'Vercel', 'XAMPP', 'FFmpeg'],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100 },
  },
};


const Skills = () => {
  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-black/5 dark:bg-white/[0.02]">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-bold">Skills</h2>
            <div className="h-[1px] flex-1 bg-black/10 dark:bg-white/10 mt-2"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillsData.map((category, idx) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-3xl p-8 hover:border-accent/50 transition-colors group relative overflow-hidden"
              >
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 to-accent/0 group-hover:from-accent/5 group-hover:to-transparent transition-all duration-500 rounded-3xl"></div>
                
                <h3 className="text-xl font-semibold mb-6 text-accent flex items-center gap-3">
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
                      whileHover={{ scale: 1.05 }}
                      className="px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl text-sm font-medium border border-transparent hover:border-accent hover:text-accent hover:shadow-[0_0_15px_rgba(250,204,21,0.2)] transition-all cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      
      {/* Decorative background element */}
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none transform translate-x-1/2 translate-y-1/2"></div>
    </section>
  );
};

export default Skills;
