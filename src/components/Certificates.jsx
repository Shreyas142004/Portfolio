import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up pdf.js worker for Vite
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const certificates = [
  {
    title: 'Introduction to Generative AI Studio',
    issuer: 'Google Cloud',
    year: '2026',
    link: '/Generative AI Studio.pdf',
  },
  {
    title: 'Google Bootcamp H2S',
    issuer: 'Google',
    year: '2026',
    link: '/Google_Bootcamp-H2S.pdf',
  },
  {
    title: 'Advanced Git Concepts',
    issuer: 'Online Course',
    year: '2026',
    link: '/Advanced Git Concepts.pdf',
  },
  {
    title: 'MOOC Course',
    issuer: 'Online Learning',
    year: '2026',
    link: '/MOOC-Course.pdf',
  },
];

const Certificates = () => {
  return (
    <section id="certificates" className="relative py-24 overflow-hidden">
      <div className="z-10 relative mx-auto px-6 container">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center gap-4 mb-16">
            <h2 className="font-bold text-4xl md:text-5xl">Certificates</h2>
            <div className="flex-1 bg-black/10 dark:bg-white/10 mt-2 h-[1px]"></div>
          </div>

          <div className="gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert, idx) => (
              <motion.a
                key={cert.title}
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="group block bg-white dark:bg-[#0a0a0a] shadow-lg hover:shadow-[0_10px_30px_rgba(250,204,21,0.15)] border border-black/10 hover:border-accent/50 dark:border-white/10 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <div className="relative flex justify-center items-center bg-black/5 dark:bg-white/5 h-48 overflow-hidden">
                  <div className="z-10 absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                  
                  {/* PDF Thumbnail */}
                  <div className="grayscale group-hover:grayscale-0 absolute inset-0 w-full h-full group-hover:scale-105 transition-all duration-500 pointer-events-none filter transform flex items-center justify-center overflow-hidden">
                    <Document 
                      file={cert.link} 
                      className="w-full h-full flex items-center justify-center"
                      loading={<div className="flex justify-center items-center h-48 w-full">Loading...</div>}
                    >
                      <Page 
                        pageNumber={1} 
                        width={400}
                        className="w-full h-full flex justify-center items-center [&>canvas]:w-full [&>canvas]:h-full [&>canvas]:object-cover" 
                        renderTextLayer={false} 
                        renderAnnotationLayer={false} 
                      />
                    </Document>
                  </div>
                  <div className="top-4 right-4 z-20 absolute">
                    <span className="bg-white/90 shadow-sm px-3 py-1 rounded-full font-bold text-black text-xs">
                      {cert.year}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="mb-1 font-bold group-hover:text-accent text-lg line-clamp-2 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="text-black/60 dark:text-white/60 text-sm">
                    {cert.issuer}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;
