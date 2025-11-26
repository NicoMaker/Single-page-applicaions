// src/components/FilmCard.js

import React from 'react';
// Assicurati che non ci siano importazioni CSS locali qui

const FilmCard = ({ film }) => {
  if (!film) return <div className="film-card-fallback">Nessun dato film disponibile.</div>;

  // Formatta la data in modo più leggibile per l'UI moderna
  const releaseDate = new Date(film.release_date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="film-card">
      <div className="card-header">
        <h2 className="film-card-title">{film.title}</h2>
        <span className="film-card-episode">Episodio {film.episode_id}</span>
      </div>
      
      <div className="film-card-details">
        <p><strong>Regista:</strong> {film.director}</p>
        <p><strong>Produttore:</strong> {film.producer}</p>
        <p><strong>Data di Uscita:</strong> {releaseDate}</p>
        <p><strong>Personaggi:</strong> <span>{film.characters.length}</span></p> {/* Span per styling specifico */}
        <p><strong>Pianeti:</strong> <span>{film.planets.length}</span></p>
        <p><strong>Navi Stellari:</strong> <span>{film.starships.length}</span></p>
      </div>

      <div className="film-card-crawl">
        <h3>Trama di Apertura</h3>
        <p>{film.opening_crawl}</p>
      </div>
    </div>
  );
};

export default FilmCard;