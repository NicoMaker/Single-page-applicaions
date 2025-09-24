import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';
import Alert from './components/Alert';
import './style.css'; // Importa il file CSS

const getInitialTodos = () => {
  const storedTodos = localStorage.getItem('todos');
  return storedTodos ? JSON.parse(storedTodos) : [];
};

const getNextId = (todos) => {
  return todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1;
};

const App = () => {
  const [todos, setTodos] = useState(getInitialTodos);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');
  const [theme, setTheme] = useState('light');
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);
  
  const nextId = getNextId(todos);

  const showAlert = ({ type, title, message, input, buttons }) => {
    setAlert({ type, title, message, input, buttons });
  };

  const addTodo = () => {
    const text = inputValue.trim();
    if (!text) {
      showAlert({
        type: 'warning',
        title: '⚠️ Attenzione!',
        message: 'Per favore, inserisci il testo dell\'attività prima di aggiungerla alla lista.',
        buttons: [{ text: '✅ Ho capito', type: 'primary', action: () => setInputValue('') }],
      });
      return;
    }

    if (text.length > 100) {
      showAlert({
        type: 'warning',
        title: '📝 Testo troppo lungo',
        message: 'L\'attività non può superare i 100 caratteri. Riduci il testo per continuare.',
        buttons: [{ text: '✂️ Riduco', type: 'primary', action: () => {} }],
      });
      return;
    }

    const newTodo = {
      id: nextId,
      text: text,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
    showAlert({
      type: 'success',
      title: '🎉 Fantastico!',
      message: `"${text}" è stata aggiunta con successo alle tue attività!`,
      buttons: [{ text: '🚀 Perfetto!', type: 'primary', action: () => {} }],
    });
  };

  const toggleTodo = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        const wasCompleted = todo.completed;
        const newTodo = { ...todo, completed: !wasCompleted };
        if (!wasCompleted) {
          showAlert({
            type: 'success',
            title: '✅ Completato!',
            message: `Ottimo lavoro! Hai completato "${todo.text}"`,
            buttons: [{ text: '🎊 Evviva!', type: 'primary', action: () => {} }],
          });
        }
        return newTodo;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    if (!todoToEdit) return;

    showAlert({
      type: 'warning',
      title: '✏️ Modifica attività',
      message: 'Inserisci il nuovo testo per questa attività:',
      input: { value: todoToEdit.text, placeholder: 'Scrivi qui il nuovo testo...' },
      buttons: [
        {
          text: '💾 Salva modifiche',
          type: 'primary',
          action: (newText) => {
            if (!newText || newText.trim() === '') {
              showAlert({
                type: 'warning',
                title: '⚠️ Testo vuoto',
                message: 'Il testo dell\'attività non può essere vuoto!',
                buttons: [{ text: '🔄 Riprova', type: 'primary', action: () => setTimeout(() => editTodo(id), 100) }],
              });
              return;
            }
            if (newText.trim().length > 100) {
              showAlert({
                type: 'warning',
                title: '📝 Testo troppo lungo',
                message: 'Il testo non può superare i 100 caratteri!',
                buttons: [{ text: '🔄 Riprova', type: 'primary', action: () => setTimeout(() => editTodo(id), 100) }],
              });
              return;
            }
            const oldText = todoToEdit.text;
            setTodos(todos.map(todo => todo.id === id ? { ...todo, text: newText.trim() } : todo));
            showAlert({
              type: 'success',
              title: '✅ Modificato con successo!',
              message: `L'attività è stata aggiornata da "${oldText}" a "${newText.trim()}"`,
              buttons: [{ text: '🎯 Perfetto!', type: 'primary', action: () => {} }],
            });
          }
        },
        { text: '❌ Annulla', type: 'secondary', action: () => {} }
      ],
    });
  };

  const deleteTodo = (id) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (!todoToDelete) return;
  
    const todoElement = document.querySelector(`.todo-item[data-id="${id}"]`);
    
    const handleDeleteWithAnimation = () => {
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
        // Fallback senza animazione se l'elemento non viene trovato
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
      showAlert({
        type: 'warning',
        title: '🤔 Nessuna attività completata',
        message: 'Non hai ancora completato nessuna attività da eliminare!<br><br>Completa alcune attività e poi torna qui. 💪',
        buttons: [{ text: '💪 Ci penso!', type: 'primary', action: () => {} }],
      });
      return;
    }
  
    const message = `Stai per eliminare <strong>${completedTodos.length} attività completate</strong>:<br><br>${completedTodos.map(t => `• ${t.text}`).join('<br>')}<br><br>⚠️ <strong>Questa azione è irreversibile!</strong>`;
  
    showAlert({
      type: 'danger',
      title: '🗑️ Elimina tutte le completate',
      message: message,
      buttons: [
        {
          text: `🗑️ Elimina ${completedTodos.length} attività`,
          type: 'danger',
          action: () => setTodos(todos.filter(t => !t.completed)),
        },
        { text: '❌ Annulla', type: 'secondary', action: () => {} },
      ],
    });
  };

  const clearAllTodos = () => {
    if (todos.length === 0) {
      showAlert({
        type: 'warning',
        title: '📝 Lista già vuota',
        message: 'La tua lista delle attività è già vuota!<br><br>Aggiungi qualche nuova attività per iniziare. 🚀',
        buttons: [{ text: '➕ Aggiungo subito!', type: 'primary', action: () => {} }],
      });
      return;
    }

    const totalTodos = todos.length;
    const completedTodosCount = todos.filter(t => t.completed).length;
    const pendingTodosCount = totalTodos - completedTodosCount;

    showAlert({
      type: 'danger',
      title: '💥 ATTENZIONE - Eliminazione totale',
      message: `<strong>Stai per eliminare TUTTE le tue ${totalTodos} attività:</strong><br><br>📊 <strong>Riepilogo:</strong><br>✅ ${completedTodosCount} completate<br>⏳ ${pendingTodosCount} in sospeso<br><br>🚨 <strong>QUESTA AZIONE È IRREVERSIBILE!</strong>`,
      buttons: [
        {
          text: '💥 SÌ, ELIMINA TUTTO',
          type: 'danger',
          action: () => setTodos([]),
        },
        { text: '❌ Annulla (meglio così!)', type: 'secondary', action: () => {} },
      ],
    });
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'pending') return !todo.completed;
    return true;
  });

  const totalCount = todos.length;
  const completedCount = todos.filter(t => t.completed).length;
  const pendingCount = totalCount - completedCount;

  const handleThemeToggle = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    showAlert({
      type: 'success',
      title: newTheme === 'dark' ? '🌙 Modalità scura attivata' : '☀️ Modalità chiara attivata',
      message: `Il tema è stato cambiato con successo! ${newTheme === 'dark' ? 'Perfetto per lavorare di sera! 🌟' : 'Ideale per la produttività diurna! ✨'}`,
      buttons: [{ text: newTheme === 'dark' ? '🌟 Fantastico!' : '✨ Perfetto!', type: 'primary', action: () => {} }],
    });
  };

  return (
    <div id="app">
      <div className="header">
        <h1>
          <span className="app-icon">✨</span>
          Le mie attività
        </h1>
        <button id="theme-toggle" onClick={handleThemeToggle}>
          <span className="theme-icon">{theme === 'dark' ? '☀️' : '🌙'}</span>
          <span className="theme-text">{theme === 'dark' ? 'Chiara' : 'Scura'}</span>
        </button>
      </div>

      <div className="input-section">
        <input
          type="text"
          id="new-todo"
          placeholder="Cosa vuoi fare oggi? 🎯"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => { if (e.key === 'Enter') addTodo(); }}
        />
        <button id="add-todo" onClick={addTodo}>
          <span className="add-icon">➕</span>
          Aggiungi
        </button>
      </div>

      {totalCount > 0 && (
        <div className="stats" id="stats">
          <div className="stat-item">
            <span className="stat-number" id="total-count">{totalCount}</span>
            <span className="stat-label">Totali</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" id="completed-count">{completedCount}</span>
            <span className="stat-label">Completate</span>
          </div>
          <div className="stat-item">
            <span className="stat-number" id="pending-count">{pendingCount}</span>
            <span className="stat-label">Da fare</span>
          </div>
        </div>
      )}

      <div className="filters-bar">
        <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Tutte</button>
        <button className={`filter-btn ${filter === 'pending' ? 'active' : ''}`} onClick={() => setFilter('pending')}>Da fare</button>
        <button className={`filter-btn ${filter === 'completed' ? 'active' : ''}`} onClick={() => setFilter('completed')}>Completate</button>
      </div>

      <ul id="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={toggleTodo}
            onEdit={editTodo}
            onDelete={deleteTodo}
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

      <div className="actions-bar">
        <button className="action-btn" id="clear-completed" onClick={clearCompletedTodos}>
          <span className="action-icon">🗑️</span>
          Elimina completate
        </button>
        <button className="action-btn" id="clear-all" onClick={clearAllTodos}>
          <span className="action-icon">💥</span>
          Elimina tutto
        </button>
      </div>
      
      {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
    </div>
  );
};

export default App;