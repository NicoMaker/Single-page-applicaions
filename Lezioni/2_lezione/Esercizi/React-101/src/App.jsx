import "./App.css";
import { useState } from "react";

function App() {
  const ciccio = "prova";
  const [count, setCount] = useState(42); // stato con valore iniziale 42

  const clickHandler = () => 
    setCount(count + 1); // aggiorna lo stato

  return (
    <>
      <button onClick={clickHandler}>Click me</button>
      <h1>{15 + 18}</h1>
      <p>{ciccio}</p>
      <p>{count}</p>
    </>
  );
}

export default App;
