// src/App.jsx
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from './contexts/RoleContext';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <BrowserRouter>
      <RoleProvider>
        <AnimatedBackground />
      </RoleProvider>
    </BrowserRouter>
  );
}

export default App;