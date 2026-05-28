import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './components/ThemeContext';
import { AudioProvider } from './components/AudioContext';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import MainPage from './components/MainPage';

function App() {
  return (
    <ThemeProvider>
      <AudioProvider>
        <CustomCursor />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/home" element={<MainPage />} />
          </Routes>
        </BrowserRouter>
      </AudioProvider>
    </ThemeProvider>
  );
}

export default App;
