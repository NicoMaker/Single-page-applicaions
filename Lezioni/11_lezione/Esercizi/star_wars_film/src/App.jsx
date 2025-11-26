// src/App.js

import React from 'react';
import FilmList from './components/Filmlist';
import './App.css'; // Puoi aggiungere del CSS base qui

function App() {
  return (
    <div className="App">
      <h1>🎬 Star Wars Films Database (SWAPI)</h1>
      <FilmList />
    </div>
  );
}

export default App;