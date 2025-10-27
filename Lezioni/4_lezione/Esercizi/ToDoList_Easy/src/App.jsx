import style from './App.module.css';
import {useTodos} from './hooks/useTodos';

import { TodoList } from './components/TodoList';
import { Card } from './components/Card';

function App() {
  const {todos, toggleTodo, deleteTodo} = useTodos();

  return (
    <>
      <Card title="ciao" />
      <Card title="prova">
        <img src='' ></img>
      </Card>
      <TodoList 
        todos={todos} 
        toggleTodo={toggleTodo} 
        deleteTodo={deleteTodo} 
      />
    </>
  )
}

export default App
