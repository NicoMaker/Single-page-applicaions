import React, { useState } from "react";
import Board from "./Board.jsx";
import "./App.css";
import "./index.css";

function App() {
  const [victories, setVictories] = useState({ X: 0, O: 0 });

  const handleWin = (winner) => {
    if (winner === "X" || winner === "O") {
      setVictories((prev) => ({
        ...prev,
        [winner]: prev[winner] + 1,
      }));
    }
  };

  const handleResetVictories = () => {
    setVictories({ X: 0, O: 0 });
  };

  return (
    <div className="app">
      <div className="card">
        <h1 className="title">Tris</h1>

        <div className="scoreboard">
          <div className="scoreboard-item">
            <span className="player-label player-x">Giocatore X: </span>
            <span className="player-score">{victories.X}</span>
          </div>
          <div className="scoreboard-item">
            <span className="player-label player-o">Giocatore O: </span>
            <span className="player-score">{victories.O}</span>
          </div>
          <button className="btn btn-small" onClick={handleResetVictories}>
            Reset Vittorie
          </button>
        </div>

        <Board onWin={handleWin} />
      </div>
    </div>
  );
}

export default App;
