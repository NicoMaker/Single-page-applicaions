import React from 'react';

const Header = ({ theme, onThemeToggle }) => {
  return (
    <div className="header">
      <h1>
        <span className="app-icon">✨</span>
        Le mie attività
      </h1>
      <button id="theme-toggle" onClick={onThemeToggle}>
        <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
        <span className="theme-text">{theme === 'dark' ? 'Chiara' : 'Scura'}</span>
      </button>
    </div>
  );
};

export default Header;