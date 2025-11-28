import React from "react";

function Square({ value, onClick, isWinning }) {
  const isEmpty = value === null;

  return (
    <button
      className={`square ${isWinning ? "square--winner" : ""} ${
        isEmpty ? "square--empty" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}


export default Square;
