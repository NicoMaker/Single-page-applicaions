import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Importa il componente App

// Trova l'elemento root nell'HTML e monta l'applicazione
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);