// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';  // ← import this

ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
).render(
  <React.StrictMode>
    <BrowserRouter>           {/* ← wrap here */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
