// src/AppRoutes.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import App from '@/App';
import Calculator from '@/Calc';
import Converter from '@/Converter';
import Money from '@/Money';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="Calc" element={<Calculator/>} />
      <Route path="Image-Convert" element={<Converter/>} />
      <Route path="currency-converter" element={<Money/>} />
    </Routes>
  );
};

export default AppRoutes;
