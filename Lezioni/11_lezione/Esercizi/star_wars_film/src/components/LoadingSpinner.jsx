import React from 'react';

/**
 * Componente per visualizzare un indicatore di caricamento (Spinner).
 * Accetta un prop 'message' opzionale per personalizzare il testo.
 */
const LoadingSpinner = ({ message = "Caricamento in corso..." }) => {
  return (
    <div className="loading-container">
      {/* Questo elemento div sarà animato dal CSS per creare lo spinner */}
      <div className="spinner"></div> 
      <p className="loading-message-text">{message}</p>
    </div>
  );
};

export default LoadingSpinner;