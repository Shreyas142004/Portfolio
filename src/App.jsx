import { useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { AudioProvider } from './components/AudioContext';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import MainPage from './components/MainPage';

function App() {
  useEffect(() => {
    // Force the website to ALWAYS start at the Hero page on fresh load or refresh
    window.location.hash = '/';

    // Anti-Inspect script
    const handleContextMenu = (e) => e.preventDefault();
    
    const handleKeyDown = (e) => {
      // Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U
      if (
        e.keyCode === 123 || 
        (e.ctrlKey && e.shiftKey && (e.keyCode === 73 || e.keyCode === 74)) || 
        (e.ctrlKey && e.keyCode === 85)
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <ThemeProvider>
      <AudioProvider>
        <CustomCursor />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/home" element={<MainPage />} />
          </Routes>
        </HashRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
