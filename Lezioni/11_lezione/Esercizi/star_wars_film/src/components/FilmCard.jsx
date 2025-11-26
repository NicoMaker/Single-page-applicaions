// src/components/FilmCard.js

import React from 'react';
// Rimuovi: import './FilmCard.css'; // NON DEVE ESSERCI

const FilmCard = ({ film }) => {
  if (!film) return <div className="film-card-fallback">Nessun dato film disponibile.</div>;

  const releaseDate = new Date(film.release_date).toLocaleDateString('it-IT', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="film-card">
      <h2 className="film-card-title">
        {film.title} 
        <span>(Episodio {film.episode_id})</span>
      </h2>
      
      <div className="film-card-details">
        <p><strong>Regista:</strong> {film.director}</p>
        <p><strong>Produttore:</strong> {film.producer}</p>
        <p><strong>Data di Uscita:</strong> {releaseDate}</p>
        <p><strong>Personaggi:</strong> {film.characters.length}</p>
        <p><strong>Pianeti:</strong> {film.planets.length}</p>
        <p><strong>Navi Stellari:</strong> {film.starships.length}</p>
      </div>

      <div className="film-card-crawl">
        <h3>Trama di Apertura</h3>
        <p>{film.opening_crawl}</p>
      </div>
    </div>
  );
};

export default FilmCard;