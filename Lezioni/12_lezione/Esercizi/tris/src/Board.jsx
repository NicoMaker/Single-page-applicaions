import React, { useState } from "react";
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
      // ritorno anche la linea vincente
      return { player: squares[a], line: [a, b, c] };
    }
  }
  return null;
}

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const result = calculateWinner(squares);
  const winner = result?.player || null;
  const winningLine = result?.line || [];
  const isDraw = !winner && squares.every((sq) => sq !== null);

  const handleClick = (index) => {
    // blocca se casella piena o partita finita
    if (squares[index] || winner) return;

    const nextSquares = [...squares];
    nextSquares[index] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  };

  let status;
  if (winner) {
    status = `Vince: ${winner}`;
  } else if (isDraw) {
    status = "Pareggio!";
  } else {
    status = `Tocca a: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <>
      <div className="status">{status}</div>
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
