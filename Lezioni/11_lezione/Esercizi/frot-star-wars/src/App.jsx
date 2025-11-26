import { useEffect, useState } from 'react';
import './App.css';
import { List } from './components/List';
import { getFilms } from './services/filmService';
import { Loading } from './components/Loading';
import { ErrorMessage } from './components/ErrorMessage';




function App() {
  const [loading, setLoading] = useState(false);
  const [films, setFilms] = useState([]);
  const [error, setError] = useState(false);

  const retreiveFilms = async () => {
    try {
      setLoading(true);
      const ff = await getFilms();
      setFilms(ff);
    }
    catch(e) {
      setError(true);
    }
    finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    retreiveFilms();
  }, []);

  return (
    <>
      {loading ?  <Loading /> :  <List films={films} />}
      {error && <ErrorMessage />}
    </>
  )
}

export default App
