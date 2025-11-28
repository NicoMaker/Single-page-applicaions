import React from "react";

function Legend({ freeCount, selectedCount, occupiedCount }) {
  return (
    <div className="legend">
      <h4>Legenda posti</h4>
      <div className="legend-items">
        <div className="legend-item">
          <span className="seat seat-free" />
          <span>Libero ({freeCount})</span>
        </div>
        <div className="legend-item">
          <span className="seat seat-selected" />
          <span>Selezionato ({selectedCount})</span>
        </div>
        <div className="legend-item">
          <span className="seat seat-occupied" />
          <span>Occupato ({occupiedCount})</span>
        </div>
      </div>
    </div>
  );
}

export default Legend;
