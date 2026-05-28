import { createContext, useContext, useState, useEffect, useRef } from 'react';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Create audio element
    audioRef.current = new Audio('/public/Calculated_Grace.mp3');
    // audioRef.current = new Audio('/my-audio.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      audioRef.current.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.log('Audio play failed:', e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => useContext(AudioContext);
