import React from "react";

function BookingSidebar({
  movies,
  times,
  selectedMovieId,
  selectedMovie,
  selectedTime,
  selectedSeats,
  totalPrice,
  onChangeMovie,
  onChangeTime,
  onClearSelection,
  onConfirm,
}) {
  return (
    <>
      <h2>Dettagli prenotazione</h2>

      <div className="field">
        <label>Film</label>
        <select
          value={selectedMovieId}
          onChange={(e) => onChangeMovie(e.target.value)}
        >
          {movies.map((m) => (
            <option key={m.id} value={m.id}>
              {m.title}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <label>Orario</label>
        <div className="time-chips">
          {times.map((time) => (
            <button
              key={time}
              className={
                "chip" + (time === selectedTime ? " chip-active" : "")
              }
              onClick={() => onChangeTime(time)}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <div className="summary-card">
        <h3>Riepilogo</h3>
        <p className="summary-movie">{selectedMovie.title}</p>
        <p className="summary-time">Orario: {selectedTime}</p>
        <p className="summary-seats">
          Posti selezionati:{" "}
          {selectedSeats.size === 0
            ? "Nessuno"
            : Array.from(selectedSeats).join(", ")}
        </p>
        <p className="summary-price">
          Totale: <strong>{totalPrice.toFixed(2)} €</strong>
        </p>

        <div className="summary-actions">
          <button
            className="btn-secondary"
            onClick={onClearSelection}
            disabled={selectedSeats.size === 0}
          >
            Annulla selezione
          </button>
          <button
            className="btn-primary"
            onClick={onConfirm}
            disabled={selectedSeats.size === 0}
          >
            Conferma posti
          </button>
        </div>
      </div>
    </>
  );
}

export default BookingSidebar;
