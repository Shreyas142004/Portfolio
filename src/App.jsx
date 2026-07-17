import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Academics from './components/Academics';
import Certificates from './components/Certificates';
import Contact from './components/Contact';
import Footer from './components/Footer';

const AppContent = () => {
  useSmoothScroll();

  return (
    <div className="min-h-screen bg-transparent relative selection:bg-accent selection:text-black overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Academics />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
