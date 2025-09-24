import React, { useState } from 'react';

const TodoInput = ({ onAddTodo, onShowAlert }) => {
  const [inputValue, setInputValue] = useState('');

  const handleAdd = () => {
    const text = inputValue.trim();
    if (!text) {
      onShowAlert({
        type: 'warning', title: '⚠️ Attenzione!', message: 'Inserisci un testo per l\'attività.',
        buttons: [{ text: '✅ Ho capito', type: 'primary', action: () => {} }],
      });
      return;
    }
    if (text.length > 100) {
      onShowAlert({
        type: 'warning', title: '📝 Testo troppo lungo', message: 'L\'attività non può superare i 100 caratteri.',
        buttons: [{ text: '✂️ Riduco', type: 'primary', action: () => {} }],
      });
      return;
    }
    onAddTodo(text);
    setInputValue('');
  };

  return (
    <div className="input-section">
      <input
        type="text"
        id="new-todo"
        placeholder="Cosa vuoi fare oggi? 🎯"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => { if (e.key === 'Enter') handleAdd(); }}
      />
      <button id="add-todo" onClick={handleAdd}>
        <span className="add-icon">➕</span>
        Aggiungi
      </button>
    </div>
  );
};

export default TodoInput;