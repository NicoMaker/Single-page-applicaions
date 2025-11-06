// src/components/AddSubjectForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddSubjectForm = ({ onAddSubject }) => {
  const [subjectName, setSubjectName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = subjectName.trim();

    if (!name) {
      setError('Il nome della materia non può essere vuoto.');
      return;
    }

    // Prova ad aggiungere la materia
    const success = onAddSubject(name);

    if (success) {
      // REINDIRIZZAMENTO AUTOMATICO
      alert(`Materia '${name}' aggiunta con successo. Tornando al dashboard...`);
      navigate('/');
    } else {
      setError(`La materia '${name}' esiste già!`);
    }
  };

  const handleChange = (e) => {
    setSubjectName(e.target.value);
    setError(''); 
  };
  
  const inputStyle = (hasError) => ({
    display: 'block', 
    width: '95%', 
    padding: '5px', 
    marginBottom: '5px',
    border: `1px solid ${hasError ? 'red' : 'black'}`
  });

  return (
    <div style={{ border: '2px solid purple', padding: '15px', marginTop: '10px' }}>
      <h3>FORM AGGIUNTA MATERIA</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="subject" style={{ display: 'block', fontWeight: 'bold' }}>NOME NUOVA MATERIA (*)</label>
        <input 
          type="text" 
          id="subject" 
          value={subjectName} 
          onChange={handleChange} 
          style={inputStyle(error)} 
        />
        {error && <p style={{ color: 'red', fontSize: '0.8em', margin: '0 0 10px 0' }}>{error}</p>}
        
        <button type="submit" style={{ padding: '10px', backgroundColor: 'purple', color: 'white', border: '1px solid darkpurple', marginTop: '15px', cursor: 'pointer' }}>
          AGGIUNGI MATERIA
        </button>
      </form>
      <Link to="/" style={{ display: 'block', marginTop: '15px', color: 'darkblue' }}>← Annulla e torna al riepilogo</Link>
    </div>
  );
};

export default AddSubjectForm;