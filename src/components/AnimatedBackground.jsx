// src/components/AnimatedBackground.jsx
import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
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
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-blue-900 to-black">
      {/* Animated gradient orbs */}
      <div 
        className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl"
        style={{
          transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      />

      {/* Geometric patterns */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid grid-cols-12 gap-4 h-full">
          {[...Array(48)].map((_, i) => (
            <div
              key={i}
              className="border border-blue-200/10 rounded-lg"
              style={{
                animation: `pulse ${2 + (i % 3)}s infinite ${i * 0.1}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Animated lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20">
        <pattern
          id="grid"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 40 0 L 0 0 0 40"
            fill="none"
            stroke="rgba(147, 197, 253, 0.2)"
            strokeWidth="1"
          />
        </pattern>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Main content */}
      <div className="relative z-10">
        <Routes>
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>

      {/* Radial gradient overlay */}
      <div 
        className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-blue-900/50"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(30, 58, 138, 0.3) 100%)'
        }}
      />

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;