import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeContext';

const Background = () => {
  const canvasRef = useRef(null);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    canvas.width = width;
    canvas.height = height;

    // Grid properties
    let gridOffset = 0;
    const gridSpeed = 0.8;
    const horizon = height * 0.45; // 3D horizon line position

    // Floating particles/binary bits
    const particles = [];
    const particleCount = 60;
    const symbols = ['0', '1', '[]', '<>', '::', 'Node', 'System', 'Decrypted'];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vy: -0.2 - Math.random() * 0.5, // Float upwards
        opacity: Math.random() * 0.5 + 0.1,
        size: Math.random() * 8 + 6,
        text: symbols[Math.floor(Math.random() * symbols.length)],
        colorType: Math.random() > 0.5 ? 'cyan' : 'purple',
      });
    }

    const draw = () => {
      // Clear canvas with deep space dark or clean light cyber bg
      ctx.fillStyle = isDark ? '#030307' : '#f9fafb';
      ctx.fillRect(0, 0, width, height);

      // Draw ambient background glows
      if (isDark) {
        // Bottom Purple Glow
        const bottomGlow = ctx.createRadialGradient(
          width / 2, height, 10,
          width / 2, height, height * 0.8
        );
        bottomGlow.addColorStop(0, 'rgba(188, 19, 254, 0.12)');
        bottomGlow.addColorStop(1, 'rgba(3, 3, 7, 0)');
        ctx.fillStyle = bottomGlow;
        ctx.fillRect(0, 0, width, height);

        // Top Left Cyan Glow
        const topLeftGlow = ctx.createRadialGradient(
          0, 0, 10,
          0, 0, width * 0.6
        );
        topLeftGlow.addColorStop(0, 'rgba(0, 255, 255, 0.08)');
        topLeftGlow.addColorStop(1, 'rgba(3, 3, 7, 0)');
        ctx.fillStyle = topLeftGlow;
        ctx.fillRect(0, 0, width, height);
      } else {
        // Light mode soft cyber cyan-blue glows
        const lightGlow = ctx.createRadialGradient(
          width / 2, height / 2, 10,
          width / 2, height / 2, width * 0.8
        );
        lightGlow.addColorStop(0, 'rgba(37, 99, 235, 0.03)');
        lightGlow.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = lightGlow;
        ctx.fillRect(0, 0, width, height);
      }

      // Draw the scrolling 3D Grid at the bottom half
      ctx.strokeStyle = isDark ? 'rgba(0, 255, 255, 0.07)' : 'rgba(37, 99, 235, 0.06)';
      ctx.lineWidth = 1;

      // Vertical perspective lines
      const lineCount = 36;
      for (let i = 0; i <= lineCount; i++) {
        const xPercent = i / lineCount;
        const startX = width * xPercent;
        const endX = width / 2 + (startX - width / 2) * 5; // Fan out downwards
        ctx.beginPath();
        ctx.moveTo(startX, horizon);
        ctx.lineTo(endX, height);
        ctx.stroke();
      }

      // Horizontal grid lines scrolling down
      gridOffset += gridSpeed;
      if (gridOffset >= 60) {
        gridOffset = 0;
      }

      let yPos = horizon;
      let count = 0;
      // Exponential spacing to simulate 3D perspective
      while (yPos < height && count < 25) {
        const progress = count / 18;
        const currentY = horizon + (height - horizon) * Math.pow(progress, 2.5) + (gridOffset * (progress + 0.1));

        if (currentY >= horizon && currentY <= height) {
          // Adjust stroke transparency based on screen distance (fade towards horizon)
          const alpha = Math.min((currentY - horizon) / (height - horizon), 1);
          ctx.strokeStyle = isDark
            ? `rgba(0, 255, 255, ${0.08 * alpha})`
            : `rgba(37, 99, 235, ${0.07 * alpha})`;

          ctx.beginPath();
          ctx.moveTo(0, currentY);
          ctx.lineTo(width, currentY);
          ctx.stroke();
        }
        count++;
      }

      // Draw Horizon line decoration
      ctx.strokeStyle = isDark ? 'rgba(188, 19, 254, 0.2)' : 'rgba(219, 39, 119, 0.15)';
      ctx.beginPath();
      ctx.moveTo(0, horizon);
      ctx.lineTo(width, horizon);
      ctx.stroke();

      // Render floating code fragments
      ctx.font = 'bold 11px monospace';
      particles.forEach((p) => {
        p.y += p.vy;
        if (p.y < -30) {
          p.y = height + 30;
          p.x = Math.random() * width;
        }

        ctx.fillStyle = isDark
          ? (p.colorType === 'cyan' ? `rgba(0, 255, 255, ${p.opacity})` : `rgba(188, 19, 254, ${p.opacity})`)
          : (p.colorType === 'cyan' ? `rgba(37, 99, 235, ${p.opacity * 0.8})` : `rgba(219, 39, 119, ${p.opacity * 0.8})`);

        ctx.fillText(p.text, p.x, p.y);
      });

      // Digital circuit accent lines at the very top and bottom edges (subtle HUD design)
      if (isDark) {
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.15)';
        ctx.lineWidth = 1;

        // Top HUD outline
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(100, 20);
        ctx.lineTo(110, 30);
        ctx.moveTo(width - 20, 20);
        ctx.lineTo(width - 100, 20);
        ctx.lineTo(width - 110, 30);
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="z-0 fixed inset-0 pointer-events-none"
    />
  );
};

export default Background;
