import React from 'react';

const TodoItem = ({ todo, onToggle, onEdit, onDelete }) => {
  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div
        className={`todo-checkbox ${todo.completed ? 'checked' : ''}`}
        onClick={() => onToggle(todo.id)}
      />
      <div
        className="todo-text"
        onClick={() => onEdit(todo.id)}
        title="Clicca per modificare"
      >
        {todo.text}
      </div>
      <div className="todo-actions">
        <button
          className="todo-btn edit-btn"
          onClick={() => onEdit(todo.id)}
          title="Modifica attività"
        >
          <span className="btn-icon">✏️</span>
        </button>
        <button
          className="todo-btn delete-btn"
          onClick={() => onDelete(todo.id)}
          title="Elimina attività"
        >
          <span className="btn-icon">🗑️</span>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;