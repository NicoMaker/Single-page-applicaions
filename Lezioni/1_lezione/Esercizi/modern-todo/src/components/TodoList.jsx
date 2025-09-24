import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ filteredTodos, onToggleTodo, onEditTodo, onDeleteTodo }) => {
  return (
    <>
      <ul id="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={onToggleTodo}
            onEdit={onEditTodo}
            onDelete={onDeleteTodo}
          />
        ))}
      </ul>
      {filteredTodos.length === 0 && (
        <div id="empty-state" className="empty-state">
          <div className="empty-icon">📝</div>
          <div className="empty-title">Nessuna attività</div>
          <div className="empty-subtitle">
            Aggiungi la tua prima attività per iniziare! 🚀
          </div>
        </div>
      )}
    </>
  );
};

export default TodoList;