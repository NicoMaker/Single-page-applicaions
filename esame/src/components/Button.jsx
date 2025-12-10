import React from 'react';

const Button = ({ children, variant = 'primary', onClick, disabled, className = '', icon: Icon }) => {
  const variants = {
    primary: 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-xl',
    secondary: 'bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
    danger: 'bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white',
    ghost: 'bg-transparent hover:bg-gray-100 text-gray-700'
  };
  
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 justify-center ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {Icon && <Icon size={20} />}
      {children}
    </button>
  );
};

export default Button;