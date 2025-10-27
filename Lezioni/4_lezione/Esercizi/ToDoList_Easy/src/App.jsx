import style from './App.module.css';
import { useState } from 'react';

function App() {
  const [count, setCount] = useState(42);

  function clickHandler() {
    setCount(x => x - 1);
  }

  const h1Style = {
    color: 'blue'
  }

  return (
    <>
      <button onClick={clickHandler}>Click me</button>
      <h1 className={count % 2 === 0 ? 'pippo' : 'pluto'}>{count}</h1>
      <h2 className={style.ciccio}>ciccio</h2>
      <h2 className="yellow green"> ciaone</h2>
    </>
  )
}

export default App
