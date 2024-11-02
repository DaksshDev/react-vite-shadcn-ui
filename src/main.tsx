// src/main.tsx

import '@/styles/globals.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './AppRoutes';
import { ThemeProvider } from "@/components/theme-provider"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
  <React.StrictMode>
    <BrowserRouter>
    <AppRoutes />
    </BrowserRouter>
  </React.StrictMode>
  </ThemeProvider>
);
