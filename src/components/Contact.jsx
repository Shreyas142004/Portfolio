import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiSend } from 'react-icons/fi';

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resultMessage, setResultMessage] = useState('');

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    setResultMessage('Sending...');

    const formData = new FormData(event.target);

    // Replace this with your Web3Forms Access Key
    formData.append("access_key", "a91961f3-90cc-42a9-9a6c-afb8a03efd97");

    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: json
      }).then((res) => res.json());

      if (res.success) {
        setResultMessage('Message sent successfully! I will get back to you soon.');
        event.target.reset();
      } else {
        setResultMessage('Something went wrong. Please try again later.');
      }
    } catch (error) {
      setResultMessage('Network error. Please try again.');
    }
    
    setIsSubmitting(false);
    setTimeout(() => setResultMessage(''), 5000);
  };
  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex items-center gap-4 mb-16 text-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold">Get In Touch</h2>
          </div>

          <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-black/5 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.12)]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
              
              {/* Left Column: Info & Socials */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-3xl font-bold mb-4">Let's work together!</h3>
                  <p className="text-black/70 dark:text-white/70 text-lg mb-8 leading-relaxed">
                    I'm currently open for new opportunities, freelance projects, or just a friendly chat about web development and AI. Feel free to drop a message!
                  </p>
                </div>

                <div className="space-y-6">
                  <a href="mailto:shreyasra7@gmail.com" className="flex items-center gap-4 text-lg font-medium hover:text-accent transition-colors">
                    <div className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
                      <FiMail size={20} />
                    </div>
                    shreyasra7@gmail.com
                  </a>
                  
                  <div className="flex gap-4 pt-4">
                    <a 
                      href="https://github.com/Shreyas142004" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-colors"
                    >
                      <FiGithub size={20} />
                    </a>
                    <a 
                      href="https://www.linkedin.com/in/shreyas-r-a-6a0567305" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-colors"
                    >
                      <FiLinkedin size={20} />
                    </a>
                    
                    {/* Resume Download Link - Ensure resume.pdf is in the public folder */}
                    <a 
                      href="/Shreyas-Resume.pdf" 
                      download
                      title="Download Resume"
                      className="w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-accent hover:text-black transition-colors ml-auto md:ml-0"
                    >
                      <FiDownload size={20} />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name"
                    required
                    className="w-full bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email"
                    required
                    className="w-full bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-black/70 dark:text-white/70 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    required
                    rows={4}
                    className="w-full bg-white dark:bg-[#0a0a0a] border border-black/10 dark:border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-accent hover:bg-yellow-500'} text-black font-bold rounded-xl flex items-center justify-center gap-2 transition-colors shadow-[0_0_20px_rgba(250,204,21,0.2)] mt-2`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <FiSend />}
                </motion.button>

                {resultMessage && (
                  <p className="text-center text-sm font-medium text-accent mt-2">
                    {resultMessage}
                  </p>
                )}
              </form>

            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-[150px] -z-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
    </section>
  );
};

export default Contact;
