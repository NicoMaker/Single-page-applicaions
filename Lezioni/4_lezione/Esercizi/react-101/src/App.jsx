import style from './App.module.css';
import { useState } from 'react';
import {produce} from 'immer';
import clsx from 'clsx';

import { ToDoList } from './components/ToDoList';


const initialState = [
  {id: 1, text: 'fare la spesa', done: false},
  {id: 2, text: 'guardare batman', done: false},
  {id: 3, text: 'imparare a usare i colori', done: false},
  {id: 4, text: 'banana', done: false},
]

function App() {
  const [todos, setTodos] = useState(initialState);

  function deleteTodo(td) {
    setTodos(todos.filter(t => t.id !== td.id));
  }

  function toggleTodo(td) {
    const index = todos.findIndex(t => t.id === td.id);

    setTodos(produce(todos, draft => {
      draft[index].done = !draft[index].done;
    }));
  }

  function editTodo(td) {
    const newText = prompt('Modifica attività:', td.text);
    if (newText !== null && newText.trim() !== '') { // Controlla che l'utente non abbia annullato o inserito testo vuoto
      setTodos(produce(todos, draft => {
        const index = draft.findIndex(t => t.id === td.id);
        if (index !== -1) {
          draft[index].text = newText.trim();
        }
      }));
    }
  }

  return (
    <>
      {/* Utilizza il componente ToDoList per renderizzare la lista */}
      <ToDoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo} // Passa la nuova funzione editTodo
      />
    </>
  )
}

export default App