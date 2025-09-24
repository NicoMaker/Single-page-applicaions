import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import Stats from './components/Stats';
import FiltersBar from './components/FiltersBar';
import ActionsBar from './components/ActionsBar';
import Alert from './components/Alert';
import './style.css';

const getInitialTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const App = () => {
  const [todos, setTodos] = useState(getInitialTodos);
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  
  const showAlert = (options) => setAlert(options);
  const getNextId = () => todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;

  const addTodo = (text) => {
    const newTodo = {
      id: getNextId(),
      text,
      completed: false,
      createdAt: new Date().toISOString(),
    };
    setTodos([...todos, newTodo]);
    showAlert({
      type: 'success',
      title: '🎉 Fantastico!',
      message: `"${text}" è stata aggiunta con successo alle tue attività!`,
      buttons: [{ text: '🚀 Perfetto!', type: 'primary', action: () => {} }],
    });
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo => {
      if (todo.id === id) {
        if (!todo.completed) {
          showAlert({
            type: 'success',
            title: '✅ Completato!',
            message: `Ottimo lavoro! Hai completato "${todo.text}"`,
            buttons: [{ text: '🎊 Evviva!', type: 'primary', action: () => {} }],
          });
        }
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    }));
  };

  const editTodo = (id, newText) => {
    const oldText = todos.find(todo => todo.id === id).text;
    setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText } : todo));
    showAlert({
      type: 'success',
      title: '✅ Modificato con successo!',
      message: `L'attività è stata aggiornata da "${oldText}" a "${newText}"`,
      buttons: [{ text: '🎯 Perfetto!', type: 'primary', action: () => {} }],
    });
  };

  const deleteTodo = (id) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    const handleDeleteWithAnimation = () => {
      const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
      if (todoElement) {
        todoElement.classList.add('animate-out');
        setTimeout(() => {
          setTodos(todos.filter(todo => todo.id !== id));
          showAlert({
            type: 'success',
            title: '✅ Eliminato!',
            message: `"${todoToDelete.text}" è stata rimossa dalle tue attività.`,
            buttons: [{ text: '👍 Ok', type: 'primary', action: () => {} }],
          });
        }, 500);
      } else {
        setTodos(todos.filter(todo => todo.id !== id));
        showAlert({
          type: 'success',
          title: '✅ Eliminato!',
          message: `"${todoToDelete.text}" è stata rimossa dalle tue attività.`,
          buttons: [{ text: '👍 Ok', type: 'primary', action: () => {} }],
        });
      }
    };
    showAlert({
      type: 'danger',
      title: '🗑️ Elimina attività',
      message: `Sei davvero sicuro di voler eliminare definitivamente "${todoToDelete.text}"?<br><br><strong>⚠️ Questa azione non può essere annullata!</strong>`,
      buttons: [
        { text: '🗑️ Sì, elimina', type: 'danger', action: handleDeleteWithAnimation },
        { text: '❌ Annulla', type: 'secondary', action: () => {} }
      ],
    });
  };

  const clearCompletedTodos = () => {
    const completedTodos = todos.filter(t => t.completed);
    if (completedTodos.length === 0) {
      showAlert({ type: 'warning', title: '🤔 Nessuna attività completata', message: 'Non hai ancora attività completate!', buttons: [{ text: '💪 Ci penso!', type: 'primary', action: () => {} }] });
      return;
    }
    showAlert({
      type: 'danger', title: '🗑️ Elimina tutte le completate', message: `Stai per eliminare <strong>${completedTodos.length} attività completate</strong>.`,
      buttons: [{ text: `🗑️ Elimina ${completedTodos.length} attività`, type: 'danger', action: () => setTodos(todos.filter(t => !t.completed)) }, { text: '❌ Annulla', type: 'secondary', action: () => {} }],
    });
  };

  const clearAllTodos = () => {
    if (todos.length === 0) {
      showAlert({ type: 'warning', title: '📝 Lista già vuota', message: 'La tua lista delle attività è già vuota!', buttons: [{ text: '➕ Aggiungo subito!', type: 'primary', action: () => {} }] });
      return;
    }
    showAlert({
      type: 'danger', title: '💥 ATTENZIONE - Eliminazione totale', message: `<strong>Stai per eliminare TUTTE le tue ${todos.length} attività:</strong><br><br>🚨 <strong>QUESTA AZIONE È IRREVERSIBILE!</strong>`,
      buttons: [{ text: '💥 SÌ, ELIMINA TUTTO', type: 'danger', action: () => setTodos([]) }, { text: '❌ Annulla', type: 'secondary', action: () => {} }],
    });
  };

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
    showAlert({ type: 'success', title: theme === 'dark' ? '☀️ Tema chiaro attivato' : '🌙 Tema scuro attivato', message: `Il tema è stato cambiato con successo!`, buttons: [{ text: '✨ Perfetto!', type: 'primary', action: () => {} }] });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const stats = {
    totalCount: todos.length,
    completedCount: todos.filter(t => t.completed).length,
    pendingCount: todos.length - todos.filter(t => t.completed).length,
  };

  return (
    <div id="app">
      <Header theme={theme} onThemeToggle={handleThemeToggle} />
      <TodoInput onAddTodo={addTodo} onShowAlert={showAlert} />
      <Stats {...stats} />
      <FiltersBar filter={filter} onSetFilter={setFilter} />
      <TodoList
        filteredTodos={filteredTodos}
        onToggleTodo={toggleTodo}
        onEditTodo={(id) => {
          const todoToEdit = todos.find(todo => todo.id === id);
          showAlert({
            type: 'warning', title: '✏️ Modifica attività', message: 'Inserisci il nuovo testo:', input: { value: todoToEdit.text },
            buttons: [
              { text: '💾 Salva', type: 'primary', action: (newText) => editTodo(id, newText) },
              { text: '❌ Annulla', type: 'secondary', action: () => {} }
            ],
          });
        }}
        onDeleteTodo={deleteTodo}
      />
      <ActionsBar onClearCompleted={clearCompletedTodos} onClearAll={clearAllTodos} />
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
    </div>
  );
};

export default App;