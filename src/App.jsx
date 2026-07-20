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
