import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AquariumPage from './pages/AquariumPage';
import AuthPage from './pages/AuthPage';

const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<AuthPage />} />
      <Route path="/aquarium" element={<AquariumPage />} />
    </Routes>
    </BrowserRouter>
  );
};

export default App;
