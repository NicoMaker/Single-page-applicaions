// src/components/FilmList.js

import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard';

// URL per recuperare tutti i film dalla SWAPI
const SWAPI_FILMS_URL = 'https://swapi.dev/api/films/';

// Stili semplici per il contenitore della lista
const listContainerStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  padding: '20px',
};

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const response = await fetch(SWAPI_FILMS_URL);
        if (!response.ok) {
          throw new Error(`Errore HTTP! Stato: ${response.status}`);
        }
        const data = await response.json();
        
        // Ordina i film per numero di episodio (episode_id) prima di salvarli
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
  }, []); // L'array vuoto assicura che venga eseguito solo al montaggio del componente

  if (isLoading) {
    return <div style={{ color: 'white' }}>**Caricamento dei film... 🚀**</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>**Errore:** {error}</div>;
  }

  return (
    <div style={listContainerStyle}>
      {/* Mappa i dati dei film e rende una FilmCard per ciascuno */}
      {films.map((film) => (
        <FilmCard key={film.episode_id} film={film} />
      ))}
    </div>
  );
};

export default FilmList;