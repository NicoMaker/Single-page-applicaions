import style from './App.module.css';
import { useState } from 'react';


const initialState = [
  {id: 1, text: 'fare la spesa', done: false},
  {id: 2, text: 'guardare batman', done: false},
  {id: 3, text: 'imparare a usare i colori', done: false},
  {id: 4, text: 'banana', done: false},
]

function App() {
  const [todos, setTodos] = useState(initialState);

  // console.log('todos', todos);

  function tmp() {
    const a1 = [1, 2, 3];
    const a2 = a1.map(x => x * 5);
    console.log(a2);
  }


  return (
    <>
    <button onClick={tmp}>ciao</button>
      <ul>
        {todos.map(t => <li key={t.id}>{t.text}</li>)}
      </ul>
    </>
  )
}

export default App
