import { useEffect, useState } from 'react'
import './App.css'
import { TodoList } from './components/TodoList';
import {getTodos, addTodo} from './services/todoService';



function App() {
  const [todos, setTodos] = useState([]);

  async function getTodos1() {
    const data = await getTodos();
    setTodos(data);
  } 

  useEffect(() => {
    getTodos1();
  }, []);


  async function addTodo1() {
    const label = prompt('Inserisci il todo');
    if(label !== null) {
      const created = await addTodo(label);
      setTodos(s => [...s, created]);
      // await getTodos1();
    }
  }



  return (
    <>
    <button onClick={addTodo1} className="btn btn-primary">Add</button>
    <div className="row col-10 offset-1 my-2">
      <TodoList todos={todos} />
    </div>
    </>
  )
}

export default App
