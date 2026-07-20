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
      console.error("Failed to submit form:", error);
      setResultMessage('Network error. Please try again.');
    }

    setIsSubmitting(false);
    setTimeout(() => setResultMessage(''), 5000);
  };
  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl"
        >
          <div className="flex flex-col items-center gap-4 mb-16 text-center">
            <span className="text-accent font-mono text-sm tracking-widest uppercase">04.</span>
            <h2 className="font-bold text-3xl md:text-5xl tracking-tight">Get In Touch</h2>
            <div className="bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent mt-2 w-24 h-[1px]"></div>
          </div>

          <div className="bg-white/50 dark:bg-white/5 shadow-[0_20px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-2xl p-8 md:p-12 lg:p-16 border border-black/10 dark:border-white/10 rounded-[2rem] lg:rounded-[3rem] relative">
            
            {/* Internal Glow for container */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-[2rem] lg:rounded-[3rem] pointer-events-none -z-10"></div>
            
            <div className="gap-12 lg:gap-24 grid grid-cols-1 md:grid-cols-2 relative z-10">

              {/* Left Column: Info & Socials */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="mb-6 font-bold text-3xl md:text-4xl text-black dark:text-white tracking-tight">Let's work together!</h3>
                  <p className="mb-10 text-black/60 dark:text-white/60 text-lg font-light leading-relaxed">
                    I'm currently open for new opportunities, freelance projects, or just a friendly chat about web development and AI. Feel free to drop a message!
                  </p>
                </div>

                <div className="space-y-6">
                  <a href="mailto:shreyasra7@gmail.com" className="group flex items-center gap-4 font-medium hover:text-accent text-lg transition-all duration-300 w-max">
                    <div className="flex justify-center items-center bg-black/5 dark:bg-white/5 group-hover:bg-accent/10 border border-black/5 dark:border-white/5 group-hover:border-accent/30 rounded-full w-14 h-14 transition-all duration-300">
                      <FiMail size={22} className="text-black/70 dark:text-white/70 group-hover:text-accent transition-colors duration-300" />
                    </div>
                    shreyasra7@gmail.com
                  </a>

                  <div className="flex gap-4 pt-6">
                    <a
                      href="https://github.com/Shreyas142004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex justify-center items-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 hover:shadow-[0_0_15px_rgba(var(--accent),0.2)] border border-transparent hover:border-accent/30 rounded-full w-14 h-14 transition-all duration-300 hover:-translate-y-1"
                    >
                      <FiGithub size={22} className="text-black/60 dark:text-white/60 group-hover:text-accent transition-colors" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shreyas-r-a-6a0567305"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex justify-center items-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 hover:shadow-[0_0_15px_rgba(var(--accent),0.2)] border border-transparent hover:border-accent/30 rounded-full w-14 h-14 transition-all duration-300 hover:-translate-y-1"
                    >
                      <FiLinkedin size={22} className="text-black/60 dark:text-white/60 group-hover:text-accent transition-colors" />
                    </a>

                    <a
                      href="/Shreyas-Resume.pdf"
                      download
                      title="Download Resume"
                      className="group flex justify-center items-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 hover:shadow-[0_0_15px_rgba(var(--accent),0.2)] border border-transparent hover:border-accent/30 rounded-full w-14 h-14 transition-all duration-300 hover:-translate-y-1 ml-auto md:ml-0"
                    >
                      <FiDownload size={22} className="text-black/60 dark:text-white/60 group-hover:text-accent transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div className="relative group">
                  <label htmlFor="name" className="block mb-2 font-medium text-black/60 dark:text-white/60 text-xs tracking-wider uppercase ml-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="bg-black/5 dark:bg-black/40 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 px-5 py-4 border border-black/10 focus:border-accent dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 w-full transition-all duration-300 group-hover:border-black/20 dark:group-hover:border-white/20 shadow-inner"
                    placeholder="Enter your name"/>
                </div>

                <div className="relative group">
                  <label htmlFor="email" className="block mb-2 font-medium text-black/60 dark:text-white/60 text-xs tracking-wider uppercase ml-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="bg-black/5 dark:bg-black/40 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 px-5 py-4 border border-black/10 focus:border-accent dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 w-full transition-all duration-300 group-hover:border-black/20 dark:group-hover:border-white/20 shadow-inner"
                    placeholder="Enter your email"
                  />
                </div>

                <div className="relative group">
                  <label htmlFor="message" className="block mb-2 font-medium text-black/60 dark:text-white/60 text-xs tracking-wider uppercase ml-1">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="bg-black/5 dark:bg-black/40 text-black dark:text-white placeholder:text-black/30 dark:placeholder:text-white/30 px-5 py-4 border border-black/10 focus:border-accent dark:border-white/10 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent/10 w-full transition-all duration-300 group-hover:border-black/20 dark:group-hover:border-white/20 shadow-inner resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 mt-2 ${
                    isSubmitting ? 'bg-black/20 dark:bg-white/20 cursor-not-allowed text-black/50 dark:text-white/50' : 'bg-accent hover:bg-accent/90 text-white dark:text-black shadow-[0_10px_20px_-10px_rgba(var(--accent),0.5)] hover:shadow-[0_15px_25px_-10px_rgba(var(--accent),0.6)]'
                  } font-bold rounded-2xl flex items-center justify-center gap-3 transition-all duration-300 text-lg`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <FiSend size={18} />}
                </motion.button>

                {resultMessage && (
                  <motion.p 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-2 font-medium text-accent text-sm text-center"
                  >
                    {resultMessage}
                  </motion.p>
                )}
              </form>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blob */}
      <div className="top-1/2 left-0 -z-10 absolute bg-accent/5 blur-[150px] rounded-full w-[40rem] h-[40rem] -translate-y-1/2 -translate-x-1/2 pointer-events-none transform"></div>
    </section>
  );
};

export default Contact;
