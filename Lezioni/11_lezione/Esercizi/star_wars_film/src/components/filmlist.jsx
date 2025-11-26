// src/components/FilmList.js

import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard';
// Rimuovi: import './FilmList.css'; // NON DEVE ESSERCI

const SWAPI_FILMS_URL = 'https://swapi.dev/api/films/';

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const [error, setError] = useState(null);

  useEffect(() => {
    // ... (Logica di fetching identica)
    const fetchFilms = async () => {
      try {
        const response = await fetch(SWAPI_FILMS_URL);
        if (!response.ok) {
          throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
        const data = await response.json();
        
        const sortedFilms = data.results.sort((a, b) => a.episode_id - b.episode_id);
        
        setFilms(sortedFilms);
        setError(null);
      } catch (err) {
        console.error("Errore nel recupero dei film:", err);
        setError("Impossibile caricare i dati dei film. Riprova più tardi.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, []);

  if (isLoading) {
    // Usa la classe loading-message definita in App.css
    return <div className="loading-message">**Caricamento dei film... 🚀**</div>;
  }

  if (error) {
    // Usa la classe error-message definita in App.css
    return <div className="error-message">**Errore:** {error}</div>;
  }
  
  // Aggiungi un componente o un div per mostrare il link alla fonte
  const sourceLink = (
    // Usa una classe per stilizzare il link (es. in App.css)
    <div className="source-link-container">
      <p>
        Dati sui film al seguente link:{' '}
        <a 
          href={SWAPI_FILMS_URL } 
          target="_blank" 
          rel="noopener noreferrer"
        >
          **SWAPI (The Star Wars API)**
        </a>
        <br />
        <br />
      </p>
    </div>
  );

  return (
    <> {/* Fragment per racchiudere elementi multipli */}
      {sourceLink} {/* Il link appare prima della lista */}
      
      {/* Usa la classe film-list-container definita in App.css */}
      <div className="film-list-container">
        {films.map((film) => (
          <FilmCard key={film.episode_id} film={film} />
        ))}
      </div>
    </>
  );
};

export default FilmList;