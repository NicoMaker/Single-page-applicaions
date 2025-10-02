import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const iconMap = {
  warning: '⚠️',
  danger: '🚨',
  success: '✅',
};

const Alert = ({ type, title, message, input, buttons, onClose }) => {
  const [show, setShow] = useState(false);
  const [inputValue, setInputValue] = useState(input?.value || '');
  const [inputRef, setInputRef] = useState(null);

  useEffect(() => {
    setShow(true);
    if (inputRef) {
      inputRef.focus();
      inputRef.select();
    }
    
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        const cancelBtn = buttons.find((btn) => btn.type === 'secondary');
        if (cancelBtn) {
          handleButtonClick(cancelBtn, inputValue);
        }
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [inputRef, buttons]);

  const handleButtonClick = (btn, value) => {
    setShow(false);
    setTimeout(() => {
      btn.action(value);
      onClose(); // Chiude l'alert e lo smonta dal DOM
    }, 400);
  };

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      const primaryBtn = buttons.find((btn) => btn.type === 'primary');
      if (primaryBtn) {
        handleButtonClick(primaryBtn, inputValue);
      }
    }
  };

  const content = (
    <div className={`custom-alert ${show ? 'show' : ''}`}>
      <div className="alert-content">
        <div className={`alert-icon ${type}`}>
          {iconMap[type]}
        </div>
        <div className="alert-title">{title}</div>
        <div className="alert-message" dangerouslySetInnerHTML={{ __html: message }} />
        {input && (
          <input
            type="text"
            className="alert-input"
            placeholder={input.placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleInputKeyPress}
            ref={setInputRef}
            maxLength="100"
          />
        )}
        <div className="alert-buttons">
          {buttons.map((btn, index) => (
            <button
              key={index}
              className={`alert-btn ${btn.type}`}
              onClick={() => handleButtonClick(btn, inputValue)}
            >
              {btn.text}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};

export default Alert;