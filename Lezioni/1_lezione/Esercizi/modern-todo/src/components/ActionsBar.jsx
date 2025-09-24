import React from 'react';

const ActionsBar = ({ onClearCompleted, onClearAll }) => {
  return (
    <div className="actions-bar">
      <button className="action-btn" id="clear-completed" onClick={onClearCompleted}>
        <span className="action-icon">🗑️</span>
        Elimina completate
      </button>
      <button className="action-btn" id="clear-all" onClick={onClearAll}>
        <span className="action-icon">💥</span>
        Elimina tutto
      </button>
    </div>
  );
};

export default ActionsBar;