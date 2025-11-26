// src/components/FilmList.js

import React, { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
// ⬇ Importa il nuovo componente Spinner
import LoadingSpinner from "./LoadingSpinner"; 
import { getFilms, SWAPI_FILMS_URL } from "../services/swapiService"; 

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setIsLoading(true); // Assicurati che sia true all'inizio della fetch
        const sortedFilms = await getFilms(); 

        setFilms(sortedFilms);
        setError(null);
      } catch (err) {
        console.error("Errore nel componente:", err);
        setError(err.message || "Si è verificato un errore sconosciuto durante il caricamento.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, []); 

  // 🚀 Utilizzo del componente LoadingSpinner
  if (isLoading)
    return (
      <LoadingSpinner message="Caricamento dei dati Star Wars..."></LoadingSpinner>
    );

  if (error) return <div className="error-message">**Errore:** {error}</div>;

  return (
    <>
      <div className="source-link-container">
        <p>
          Dati sui film al seguente link:{" "}
          <a href={SWAPI_FILMS_URL} target="_blank" rel="noopener noreferrer">
            **SWAPI: {SWAPI_FILMS_URL}**
          </a>
        </p>
      </div>

      <div className="film-list-container">
        {films.map((film) => (
          <FilmCard key={film.episode_id} film={film} />
        ))}
      </div>
    </>
  );
};

export default FilmList;