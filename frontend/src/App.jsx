import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AquariumPage from './pages/AquariumPage';
import AuthPage from './pages/AuthPage';
import { UserProvider } from './context/userContext';

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/aquarium" element={<AquariumPage />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
