import React from "react";

function Square({ value, onClick, isWinning }) {
  const isEmpty = value === null;

  const className = [
    "square",
    isEmpty ? "square--empty" : "",
    isWinning ? "square--winner" : "",
  ]
    .join(" ")
    .trim();

  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  );
}

export default Square;
