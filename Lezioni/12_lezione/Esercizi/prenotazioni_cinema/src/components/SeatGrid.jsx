import React from "react";

function SeatGrid({
  rows,
  seatsPerRow,
  occupiedSeats,
  selectedSeats,
  onSeatClick,
}) {
  return (
    <div className="seats-grid">
      {rows.map((row) => (
        <div key={row} className="row">
          <span className="row-label">{row}</span>
          <div className="row-seats">
            {Array.from({ length: seatsPerRow }).map((_, index) => {
              const seatNumber = index + 1;
              const seatId = `${row}${seatNumber}`;

              const isOccupied = occupiedSeats.has(seatId);
              const isSelected = selectedSeats.has(seatId);

              let seatClass = "seat";
              if (isOccupied) seatClass += " seat-occupied";
              else if (isSelected) seatClass += " seat-selected";
              else seatClass += " seat-free";

              return (
                <button
                  key={seatId}
                  className={seatClass}
                  onClick={() => onSeatClick(seatId)}
                  disabled={isOccupied}
                >
                  {seatNumber}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SeatGrid;
