import React, { useMemo, useState } from "react";
import BookingSidebar from "./components/BookingSidebar.jsx";
import SeatGrid from "./components/SeatGrid.jsx";
import Legend from "./components/Legend.jsx";

const ROWS = ["A", "B", "C", "D", "E", "F", "G"];
const SEATS_PER_ROW = 10;

const movies = [
  { id: "inception", title: "Inception" },
  { id: "oppenheimer", title: "Oppenheimer" },
  { id: "dune2", title: "Dune: Part Two" },
];

const times = ["18:00", "21:00", "23:30"];

const initialShowData = {
  "inception|21:00": new Set(["A1", "A2", "B5", "C7"]),
  "oppenheimer|18:00": new Set(["D3", "D4", "E1"]),
  "dune2|23:30": new Set(["F9", "F10", "G2"]),
};

const ticketPrice = 8.5;

function App() {
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0].id);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [showSeatsMap, setShowSeatsMap] = useState(initialShowData);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  const selectedMovie = movies.find((m) => m.id === selectedMovieId);

  const showKey = `${selectedMovieId}|${selectedTime}`;
  const occupiedSeats = showSeatsMap[showKey] ?? new Set();

  const totalSeats = ROWS.length * SEATS_PER_ROW;
  const occupiedCount = occupiedSeats.size;
  const selectedCount = selectedSeats.size;
  const freeCount = totalSeats - occupiedCount - selectedCount;

  const totalPrice = useMemo(
    () => selectedSeats.size * ticketPrice,
    [selectedSeats]
  );

  const handleSeatClick = (seatId) => {
    if (occupiedSeats.has(seatId)) return;

    const next = new Set(selectedSeats);
    if (next.has(seatId)) next.delete(seatId);
    else next.add(seatId);
    setSelectedSeats(next);
  };

  const handleConfirm = () => {
    if (selectedSeats.size === 0) return;

    const nextShowSeatsMap = { ...showSeatsMap };
    const currentSet = new Set(occupiedSeats);
    selectedSeats.forEach((s) => currentSet.add(s));
    nextShowSeatsMap[showKey] = currentSet;

    setShowSeatsMap(nextShowSeatsMap);
    setSelectedSeats(new Set());
    alert("Prenotazione confermata!");
  };

  const handleClearSelection = () => {
    setSelectedSeats(new Set());
  };

  const handleChangeMovie = (newMovieId) => {
    setSelectedMovieId(newMovieId);
    setSelectedSeats(new Set());
  };

  const handleChangeTime = (newTime) => {
    setSelectedTime(newTime);
    setSelectedSeats(new Set());
  };

  return (
    <div className="app">
      <header className="app-header">
        <div className="brand">
          <span className="brand-logo">🎬</span>
          <span className="brand-name">CineBooking</span>
        </div>
        <div className="header-right">
          <span className="badge">Sala 1</span>
        </div>
      </header>

      <main className="app-main">
        <section className="panel panel-left">
          <BookingSidebar
            movies={movies}
            times={times}
            selectedMovieId={selectedMovieId}
            selectedMovie={selectedMovie}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onChangeMovie={handleChangeMovie}
            onChangeTime={handleChangeTime}
            onClearSelection={handleClearSelection}
            onConfirm={handleConfirm}
          />

          <Legend
            freeCount={freeCount}
            selectedCount={selectedCount}
            occupiedCount={occupiedCount}
          />
        </section>

        <section className="panel panel-right">
          <h2>Seleziona i posti</h2>
          <div className="screen">Schermo</div>

          <SeatGrid
            rows={ROWS}
            seatsPerRow={SEATS_PER_ROW}
            occupiedSeats={occupiedSeats}
            selectedSeats={selectedSeats}
            onSeatClick={handleSeatClick}
          />
        </section>
      </main>
    </div>
  );
}

export default App;
