import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import WelcomePage from '../pages/WelcomePage';
import HomePage from '../pages/HomePage';

const AnimatedBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const location = useLocation();

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: (e.clientY / window.innerHeight) * 2 - 1,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900/95 to-blue-950">
      {/* Subtle gradient orbs */}
      <div 
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[100px] opacity-30"
        style={{
          transform: `translate(
            ${mousePosition.x * 15}px, 
            ${mousePosition.y * 15}px
          )`,
          transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1)'
        }}
      />
      
      {/* Geometric grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-12 gap-2 h-full">
          {[...Array(144)].map((_, i) => (
            <div
              key={i}
              className="border border-blue-300/10 rounded-sm"
              style={{
                animation: `pulse ${8 + (i % 5)}s infinite ${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Dynamic grid lines */}
      <svg className="absolute inset-0 w-full h-full opacity-15">
        <pattern
          id="grid"
          width="60"
          height="60"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 60 0 L 0 0 0 60"
            fill="none"
            stroke="rgba(147, 197, 253, 0.1)"
            strokeWidth="0.5"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main content */}
      <div className="relative z-10">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/generator" element={<HomePage />} />
        </Routes>
      </div>

      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 50%, transparent 0%, rgba(30, 58, 138, 0.15) 100%)'
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.05; }
          50% { opacity: 0.15; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;