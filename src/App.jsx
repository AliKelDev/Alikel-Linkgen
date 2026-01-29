import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { RoleProvider } from './contexts/RoleContext';
import { AuthProvider } from './contexts/AuthContext';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RoleProvider>
          <AnimatedBackground />
        </RoleProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
