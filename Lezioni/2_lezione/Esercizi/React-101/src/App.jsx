import { useState } from "react";
import DecreaseCounter from "./DecreaseCounter";
import IncreaseCounter from "./IncreaseCounter";
import './App.css';

function App() {
  const [value, setValue] = useState(0);

  const numberColorClass = value < 0 ? 'negative' : 'positive';

  return (
    <div className="app-container">
      <h1 className="title">Modern Counter</h1>
      <h2 className={`number ${numberColorClass}`}>{value}</h2>
      <div className="buttons">
        <DecreaseCounter setValue={setValue} />
        <IncreaseCounter setValue={setValue} />
      </div>
    </div>
  );
}

export default App;