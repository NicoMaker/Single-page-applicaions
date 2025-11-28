import React, { useMemo, useState } from "react";
import BookingSidebar from "./components/BookingSidebar.jsx";
import SeatGrid from "./components/SeatGrid.jsx";
import Legend from "./components/Legend.jsx";

// righe A..Z, 7 posti per riga (A1..Z7)
const ROWS = [
  "A","B","C","D","E","F","G",
  "H","I","J","K","L","M","N",
  "O","P","Q","R","S","T","U",
  "V","W","X","Y","Z"
];
const SEATS_PER_ROW = 10;

// più sale
const halls = [
  { id: "hall1", name: "Sala 1" },
  { id: "hall2", name: "Sala 2" },
  { id: "hall3", name: "Sala 3" },
];

const movies = [
  { id: "inception", title: "Inception" },
  { id: "oppenheimer", title: "Oppenheimer" },
  { id: "dune2", title: "Dune: Part Two" },
];

const times = ["18:00", "21:00", "23:30"];

// mappa: sala|film|orario -> posti occupati
const initialShowData = {
  "hall1|inception|21:00": new Set(["A1", "A2", "B5", "C7"]),
  "hall1|oppenheimer|18:00": new Set(["D3", "D4", "E1"]),
  "hall2|dune2|23:30": new Set(["F6", "F7", "G2"]),
  "hall3|inception|18:00": new Set(["A3", "A4", "B1", "B2"]),
};

const ticketPrice = 8.5;

function App() {
  const [selectedHallId, setSelectedHallId] = useState(halls[0].id);
  const [selectedMovieId, setSelectedMovieId] = useState(movies[0].id);
  const [selectedTime, setSelectedTime] = useState(times[1]);
  const [showSeatsMap, setShowSeatsMap] = useState(initialShowData);
  const [selectedSeats, setSelectedSeats] = useState(new Set());

  const selectedHall = halls.find((h) => h.id === selectedHallId);
  const selectedMovie = movies.find((m) => m.id === selectedMovieId);

  const showKey = `${selectedHallId}|${selectedMovieId}|${selectedTime}`;
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

  const handleChangeHall = (newHallId) => {
    setSelectedHallId(newHallId);
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
          <span className="badge">{selectedHall.name}</span>
        </div>
      </header>

      <main className="app-main">
        <section className="panel panel-left">
          <BookingSidebar
            halls={halls}
            movies={movies}
            times={times}
            selectedHallId={selectedHallId}
            selectedMovieId={selectedMovieId}
            selectedMovie={selectedMovie}
            selectedTime={selectedTime}
            selectedSeats={selectedSeats}
            totalPrice={totalPrice}
            onChangeHall={handleChangeHall}
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
