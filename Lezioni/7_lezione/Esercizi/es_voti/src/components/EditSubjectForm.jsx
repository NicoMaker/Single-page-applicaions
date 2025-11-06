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
      // REINDIRIZZAMENTO AUTOMATICO
      alert(`Materia '${oldName}' modificata in '${trimmedNewName}'.`);
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
    border: `1px solid ${error ? 'red' : 'black'}`,
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
        
        <button type="submit" style={{ padding: '10px', backgroundColor: 'purple', color: 'white', border: '1px solid darkpurple', marginTop: '15px', cursor: 'pointer' }}>
          SALVA MODIFICHE
        </button>
      </form>
      <Link to={`/subject/${oldName}`} style={{ display: 'block', marginTop: '15px', color: 'darkblue' }}>← Annulla e torna al dettaglio</Link>
    </div>
  );
};

export default EditSubjectForm;