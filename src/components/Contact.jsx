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
    <section id="contact" className="relative py-24 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-5xl"
        >
          <div className="flex justify-center items-center gap-4 mb-16 text-center">
            <h2 className="font-bold text-4xl md:text-5xl">Get In Touch</h2>
          </div>

          <div className="bg-white/50 dark:bg-white/5 shadow-[0_8px_30px_rgb(0 0 0 0.04)] dark:shadow-[0_8px_30px_rgb(0 0 0 0.12)] backdrop-blur-xl p-8 md:p-12 border border-black/5 dark:border-white/10 rounded-3xl">
            <div className="gap-12 lg:gap-24 grid grid-cols-1 md:grid-cols-2">

              {/* Left Column: Info & Socials */}
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3 className="mb-4 font-bold text-3xl">Let's work together!</h3>
                  <p className="mb-8 text-black/70 dark:text-white/70 text-lg leading-relaxed">
                    I'm currently open for new opportunities, freelance projects, or just a friendly chat about web development and AI. Feel free to drop a message!
                  </p>
                </div>

                <div className="space-y-6">
                  <a href="mailto:shreyasra7@gmail.com" className="flex items-center gap-4 font-medium hover:text-accent text-lg transition-colors">
                    <div className="flex justify-center items-center bg-black/5 dark:bg-white/5 rounded-full w-12 h-12">
                      <FiMail size={20} />
                    </div>
                    shreyasra7@gmail.com
                  </a>

                  <div className="flex gap-4 pt-4">
                    <a
                      href="https://github.com/Shreyas142004"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex justify-center items-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-full w-12 h-12 transition-colors"
                    >
                      <FiGithub size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
                    </a>
                    <a
                      href="https://www.linkedin.com/in/shreyas-r-a-6a0567305"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex justify-center items-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 rounded-full w-12 h-12 transition-colors"
                    >
                      <FiLinkedin size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
                    </a>

                    <a
                      href="/Shreyas-Resume.pdf"
                      download
                      title="Download Resume"
                      className="group flex justify-center items-center bg-black/5 hover:bg-black/10 dark:bg-white/5 dark:hover:bg-white/10 ml-auto md:ml-0 rounded-full w-12 h-12 transition-colors"
                    >
                      <FiDownload size={20} className="text-text-secondary group-hover:text-accent transition-colors" />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <form className="flex flex-col gap-6" onSubmit={onSubmit}>
                <div>
                  <label htmlFor="name" className="block mb-2 font-medium text-black/70 dark:text-white/70 text-sm">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="bg-white dark:bg-[#0a0a0a] px-4 py-3 border border-black/10 focus:border-accent dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent w-full transition-all"
                    placeholder="Enter your name"/>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 font-medium text-black/70 dark:text-white/70 text-sm">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="bg-white dark:bg-[#0a0a0a] px-4 py-3 border border-black/10 focus:border-accent dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent w-full transition-all"
                    placeholder="Enter your email"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 font-medium text-black/70 dark:text-white/70 text-sm">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    className="bg-white dark:bg-[#0a0a0a] px-4 py-3 border border-black/10 focus:border-accent dark:border-white/10 rounded-xl focus:outline-none focus:ring-1 focus:ring-accent w-full transition-all resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 ${isSubmitting ? 'bg-gray-400 cursor-not-allowed text-black' : 'bg-accent hover:opacity-90 text-white dark:text-black'} font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg mt-2`}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  {!isSubmitting && <FiSend />}
                </motion.button>

                {resultMessage && (
                  <p className="mt-2 font-medium text-accent text-sm text-center">
                    {resultMessage}
                  </p>
                )}
              </form>

            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Blob */}
      <div className="top-0 right-0 -z-10 absolute bg-accent/5 blur-[150px] rounded-full w-96 h-96 -translate-y-1/3 translate-x-1/3 pointer-events-none transform"></div>
    </section>
  );
};

export default Contact;
