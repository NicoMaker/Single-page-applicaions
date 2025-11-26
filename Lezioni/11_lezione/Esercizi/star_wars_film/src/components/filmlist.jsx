// src/components/FilmList.js

import React, { useState, useEffect } from "react";
import FilmCard from "./FilmCard";
// ⬇ Importa solo le funzioni e costanti necessarie dal servizio
import { getFilms, SWAPI_FILMS_URL } from "../services/swapiService";

const FilmList = () => {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        setIsLoading(true);
        // 🚀 Utilizza la funzione del servizio Axios
        const sortedFilms = await getFilms();

        setFilms(sortedFilms);
        setError(null);
      } catch (err) {
        // Cattura l'errore rilanciato dal servizio
        console.error("Errore nel componente:", err);
        setError(
          err.message ||
            "Si è verificato un errore sconosciuto durante il caricamento."
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilms();
  }, []); // L'array di dipendenze vuoto esegue il fetch solo al mount

  if (isLoading)
    return (
      <div className="loading-message">**Caricamento dei film... 🚀**</div>
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
