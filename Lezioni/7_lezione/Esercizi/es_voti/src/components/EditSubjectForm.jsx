// src/components/EditSubjectForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditSubjectForm = ({ onEditSubject }) => {
  const { subjectName: oldName } = useParams();
  const [newName, setNewName] = useState(oldName);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNewName = newName.trim();

    if (!trimmedNewName) {
      setError('Il nome della materia non può essere vuoto.');
      return;
    }
    
    // Richiama la funzione di modifica in App.jsx
    const success = onEditSubject(oldName, trimmedNewName);

    if (success) {
      alert(`Materia '${oldName}' modificata in '${trimmedNewName}'.`);
      // Reindirizza alla nuova pagina del dettaglio materia
      navigate(`/subject/${trimmedNewName}`); 
    } else {
      setError('Errore nella modifica della materia.'); 
    }
  };

  const inputStyle = (hasError) => ({
    display: 'block', 
    width: '95%', 
    padding: '5px', 
    marginBottom: '5px',
    border: `1px solid ${hasError ? 'red' : 'black'}`,
  });
  
  return (
    <div style={{ border: '2px solid purple', padding: '15px', marginTop: '10px' }}>
      <h3>MODIFICA MATERIA: {oldName}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="newName" style={{ display: 'block', fontWeight: 'bold' }}>NUOVO NOME (*)</label>
        <input 
          type="text" 
          id="newName" 
          value={newName} 
          onChange={(e) => {
              setNewName(e.target.value);
              setError('');
          }} 
          style={inputStyle(error)} 
        />
        {error && <p style={{ color: 'red', fontSize: '0.8em', margin: '0 0 10px 0' }}>{error}</p>}
        
        <button type="submit" style={{ padding: '10px', backgroundColor: 'purple', color: 'white', border: '1px solid purple', cursor: 'pointer', marginTop: '10px' }}>
          SALVA MODIFICA NOME
        </button>
      </form>
      <Link to="/" style={{ display: 'block', marginTop: '10px', color: 'darkblue' }}>← Annulla e torna al riepilogo</Link>
    </div>
  );
};

export default EditSubjectForm;