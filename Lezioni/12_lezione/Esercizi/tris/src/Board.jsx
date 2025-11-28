import React, { useState, useEffect } from "react";
import Square from "./Square.jsx";

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let [a, b, c] of lines) {
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function Board({ onWin }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [hasReportedWin, setHasReportedWin] = useState(false);

  const result = calculateWinner(squares);
  const winner = result?.player || null;
  const winningLine = result?.line || [];
  const isDraw = !winner && squares.every((sq) => sq !== null);

  const handleClick = (index) => {
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setHasReportedWin(false);
  };

  useEffect(() => {
    if (winner && onWin && !hasReportedWin) {
      onWin(winner);
      setHasReportedWin(true);
    }
  }, [winner, onWin, hasReportedWin]);

  let statusNode;
  if (winner) {
    statusNode = (
      <div className="win-banner">
        <span className="win-label">Vittoria</span>
        <span className={`win-player win-player-${winner.toLowerCase()}`}>
          Giocatore {winner}
        </span>
      </div>
    );
  } else if (isDraw) {
    statusNode = <div className="status">Pareggio!</div>;
  } else {
    statusNode = (
      <div className="status">
        Tocca a: <span className="turn-player">{xIsNext ? "X" : "O"}</span>
      </div>
    );
  }

  return (
    <>
      {statusNode}
      <div className="board">
        {squares.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => handleClick(index)}
            isWinning={winningLine.includes(index)}
          />
        ))}
      </div>
      <button className="btn" onClick={handleReset}>
        Nuova partita
      </button>
    </>
  );
}

export default Board;
