import axios from 'axios';

// ⬇ Esportazione dell'URL di base (Chiamata Base)
export const SWAPI_FILMS_URL = "https://swapi.dev/api/films/";

/**
 * Funzione per recuperare tutti i film di Star Wars da SWAPI utilizzando Axios.
 * @returns {Promise<Array>} Una promessa che si risolve con l'array ordinato dei film.
 */
export const getFilms = async () => {
    try {
        // 🚀 Chiamata Axios all'URL di base
        const response = await axios.get(SWAPI_FILMS_URL);

        // Axios restituisce i dati direttamente in `response.data`.
        // La struttura della risposta SWAPI è { results: [...] }
        const films = response.data.results;

        // Ordina i film per ID episodio prima di restituirli
        const sortedFilms = films.sort(
            (a, b) => a.episode_id - b.episode_id
        );

        return sortedFilms;
    } catch (error) {
        // Logga l'errore per il debug
        console.error("Errore nel recupero dei film con Axios:", error);
        
        // Rilancia un errore per essere gestito dal componente (Filmlist)
        throw new Error("Impossibile caricare i dati dei film da SWAPI.");
    }
};