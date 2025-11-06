// src/components/EditGradeForm.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

const EditGradeForm = ({ grades, subjects, onEditGrade }) => {
  const { gradeId } = useParams();
  const navigate = useNavigate();
  
  // CONVERSIONE CRITICA: converte l'ID stringa dell'URL in un numero intero (base 10)
  const numericGradeId = parseInt(gradeId, 10); 
  
  // Trova il voto originale usando l'ID NUMERICO
  const originalGrade = grades.find(g => g.id === numericGradeId);

  // Reindirizza se il voto non esiste
  if (!originalGrade) {
    return (
      <div style={{ color: 'red', border: '1px solid red', padding: '10px', marginTop: '10px' }}>
        <h3>ERRORE GRAVE</h3>
        <p>Voto con ID {gradeId} non trovato (forse un fantasma?).</p> 
        <Link to="/" style={{ color: 'darkblue' }}>Torna al Dashboard</Link>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    exam: originalGrade.exam,
    subject: originalGrade.subject, 
    // Assicurati di convertire il numero del voto in stringa per l'input value
    grade: originalGrade.grade.toString(), 
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    const gradeValue = parseFloat(formData.grade);

    if (!formData.exam.trim()) newErrors.exam = 'Nome esame richiesto.';
    
    if (formData.grade === '') {
      newErrors.grade = 'Voto richiesto.';
    } else if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
      newErrors.grade = 'Voto deve essere un numero valido tra 0 e 10 (es. 6, 7.5).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedGrade = {
        ...originalGrade, 
        subject: formData.subject,
        exam: formData.exam.trim(),
        grade: parseFloat(formData.grade), 
      };

      onEditGrade(updatedGrade);
      alert(`Voto modificato: ${updatedGrade.subject} - ${updatedGrade.grade}`);
      navigate(`/subject/${updatedGrade.subject}`); // Torna al dettaglio della materia
    }
  };

  const inputStyle = (error) => ({
    display: 'block', 
    width: '95%', 
    padding: '5px', 
    marginBottom: '5px',
    border: `1px solid ${error ? 'red' : 'black'}`,
  });

  return (
    <div style={{ border: '2px solid orange', padding: '15px', marginTop: '10px' }}>
      <h3>MODIFICA VOTO (ID: {originalGrade.id})</h3>
      <p style={{ fontSize: '0.9em', color: 'gray' }}>Data originale: {originalGrade.date}</p>
      <form onSubmit={handleSubmit}>
        
        {/* Nome Esame */}
        <label htmlFor="exam" style={{ display: 'block', fontWeight: 'bold' }}>NOME ESAME (*)</label>
        <input type="text" id="exam" name="exam" value={formData.exam} onChange={handleChange} style={inputStyle(errors.exam)} />
        {errors.exam && <p style={{ color: 'red', fontSize: '0.8em', margin: '0 0 10px 0' }}>{errors.exam}</p>}

        {/* Materia (Select) */}
        <label htmlFor="subject" style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>MATERIA</label>
        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} style={inputStyle(null)}>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
        
        {/* Voto (Numero) */}
        <label htmlFor="grade" style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>VOTO (0-10) (*)</label>
        <input type="number" id="grade" name="grade" value={formData.grade} onChange={handleChange} step="0.1" min="0" max="10" style={inputStyle(errors.grade)} />
        {errors.grade && <p style={{ color: 'red', fontSize: '0.8em', margin: '0 0 10px 0' }}>{errors.grade}</p>}

        <button type="submit" style={{ padding: '10px', backgroundColor: 'orange', color: 'white', border: '1px solid orange', cursor: 'pointer', marginTop: '10px' }}>
          SALVA MODIFICHE
        </button>
      </form>
      <Link to={`/subject/${originalGrade.subject}`} style={{ display: 'block', marginTop: '10px', color: 'darkblue' }}>← Annulla modifica</Link>
    </div>
  );
};

export default EditGradeForm;