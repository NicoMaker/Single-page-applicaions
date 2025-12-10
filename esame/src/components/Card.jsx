import React from 'react';

const Card = ({ children, className = '', hover = false }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 ${hover ? 'hover:shadow-2xl transition-all duration-300' : ''} ${className}`}>
      {children}
    </div>
  );
};

export default Card;