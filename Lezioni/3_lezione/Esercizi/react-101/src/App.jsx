import style from './App.module.css';
import { useState } from 'react';
import {produce} from 'immer';
import clsx from 'clsx';
import { MyButton } from './components/MyButton';


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
    setTodos(produce(todos, draft => {
      draft.pop();
    }));
  }

  function deleteTodo(td) {
    
    setTodos(todos.filter(t => t.id !== td.id));


    // const index = todos.findIndex(t => t.id === td.id);

    // setTodos(produce(todos, draft => {
    //   draft.splice(index, 1);
    // }));
  }

  function toggleTodo(td) {
    const index = todos.findIndex(t => t.id === td.id);

    setTodos(produce(todos, draft => {
      draft[index].done = !draft[index].done;
    }));
  }

  // function todoStyle(td) {
  //   let res = 'todo';
  //   if(td.done) {
  //     res += ' done';
  //   }

  //   return res;
  // }

  // function todoStyle(td) {
  //   // return clsx(['todo', td.done && 'done']);
  //   // return clsx({'todo': true, 'done': td.done});
  //   return ;
  //   // return ['todo', td.done ? 'done' : null].filter(x => !!x).join(' ');
  // }

  return (
    <>
      <ul>
        {todos.map(t => <li key={t.id}>
            <span className={clsx('todo', {'done': t.done})}>{t.text}</span>
            <MyButton 
              level={4} 
              icon="fa-trash" 
              clickHandler={() => deleteTodo(t)} 
            />
            <MyButton 
              icon={ t.done ? 'fa-times' : 'fa-check'} 
              clickHandler={() => toggleTodo(t)} 
            />
          </li>)}
      </ul>
    </>
  )
}

export default App