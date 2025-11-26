// src/components/FilmCard.js

import React from 'react';
// Stili semplici per la card - puoi metterli in un file CSS separato
const cardStyle = {
  border: '2px solid #ffe81f', // Giallo Star Wars
  borderRadius: '8px',
  padding: '20px',
  margin: '15px',
  backgroundColor: '#1c1c1c',
  color: 'white',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
  maxWidth: '400px',
};

const titleStyle = {
  color: '#ffe81f',
  borderBottom: '1px solid #ffe81f',
  paddingBottom: '10px',
  marginBottom: '15px',
};

const detailStyle = {
  marginBottom: '8px',
};

const crawlStyle = {
  marginTop: '15px',
  padding: '10px',
  border: '1px dashed #3a3a3a',
  fontStyle: 'italic',
  fontSize: '0.9em',
};


const FilmCard = ({ film }) => {
  if (!film) return <div>Nessun dato film.</div>;

  // Formatta la data di uscita
  const releaseDate = new Date(film.release_date).toLocaleDateString('it-IT');

  return (
    <div style={cardStyle}>
      <h2 style={titleStyle}>{film.title} (Episodio {film.episode_id})</h2>
      
      <div style={detailStyle}>
        **Regista:** {film.director}
      </div>
      <div style={detailStyle}>
        **Produttore:** {film.producer}
      </div>
      <div style={detailStyle}>
        **Data di Uscita:** {releaseDate}
      </div>
      <div style={detailStyle}>
        **Personaggi:** {film.characters.length}
      </div>
      <div style={detailStyle}>
        **Pianeti:** {film.planets.length}
      </div>
      <div style={detailStyle}>
        **Navi Stellari:** {film.starships.length}
      </div>

      <div style={crawlStyle}>
        **Trama di Apertura:**
        <p>{film.opening_crawl}</p>
      </div>
    </div>
  );
};

export default FilmCard;