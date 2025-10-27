import style from './App.module.css';
import { useState, useEffect } from 'react';
import {produce} from 'immer';

import { ToDoList } from './components/ToDoList';
import { TodoInput } from './components/TodoInput';
import { Filters } from './components/Filters';

const initialState = [
  {id: 1, text: 'fare la spesa', done: false},
  {id: 2, text: 'guardare batman', done: false},
  {id: 3, text: 'imparare a usare i colori', done: false},
  {id: 4, text: 'banana', done: false},
];

function App() {
  const [todos, setTodos] = useState(initialState);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  function addTodo(text) {
    const newTodo = {
      id: Date.now(), // Usa un timestamp per un ID univoco semplice
      text,
      done: false,
    };
    setTodos(produce(todos, draft => {
      draft.push(newTodo);
    }));
  }

  function deleteTodo(td) {
    setTodos(todos.filter(t => t.id !== td.id));
  }

  function toggleTodo(td) {
    setTodos(produce(todos, draft => {
      const todo = draft.find(t => t.id === td.id);
      if (todo) {
        todo.done = !todo.done;
      }
    }));
  }

  function editTodo(td) {
    const newText = prompt('Modifica attività:', td.text);
    if (newText !== null && newText.trim() !== '') {
      setTodos(produce(todos, draft => {
        const todo = draft.find(t => t.id === td.id);
        if (todo) {
          todo.text = newText.trim();
        }
      }));
    }
  }

  const toggleTheme = () => {
    setTheme(currentTheme => currentTheme === 'light' ? 'dark' : 'light');
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'completed') return todo.done;
    if (filter === 'pending') return !todo.done;
    return true;
  });

  return (
    <div className={style.app}>
      <div className={style.header}>
        <h1>
          <span className={style.appIcon}>✨</span>
          Le mie attività
        </h1>
        <button onClick={toggleTheme} className={style.themeToggle}>
          <span className={style.themeIcon}>{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className={style.themeText}>{theme === 'dark' ? 'Chiara' : 'Scura'}</span>
        </button>
      </div>

      <TodoInput addTodo={addTodo} />

      <Filters filter={filter} setFilter={setFilter} />

      {filteredTodos.length === 0 && (
        <div className={style.emptyState}>
          <div className={style.emptyIcon}>📝</div>
          <div className={style.emptyTitle}>Nessuna attività qui!</div>
          <div className={style.emptySubtitle}>Aggiungi una nuova attività o cambia filtro.</div>
        </div>
      )}

      <ToDoList
        todos={filteredTodos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
    </div>
  )
}

export default App