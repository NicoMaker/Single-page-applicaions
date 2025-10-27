import style from './App.module.css';
import { useState } from 'react';
import {produce} from 'immer';
import clsx from 'clsx';

import { TodoListItem } from './components/TodoListItem';


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

  return (
    <>
      <ul>
        {todos.map(t => <TodoListItem 
                          todo={t} 
                          toggleTodo={() => toggleTodo(t)}
                          deleteTodo={() => deleteTodo(t)}
                          key={t.id} 
                        />)}
      </ul>
    </>
  )
}

export default App
