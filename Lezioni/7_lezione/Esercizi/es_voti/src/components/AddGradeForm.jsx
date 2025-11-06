// src/components/AddGradeForm.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const AddGradeForm = ({ subjects, onAddGrade }) => {
  const [formData, setFormData] = useState({
    exam: '',
    subject: subjects[0] || '', 
    grade: '',
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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
      newErrors.grade = 'Voto deve essere tra 0 e 10.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newGrade = {
        exam: formData.exam.trim(),
        subject: formData.subject,
        grade: parseFloat(formData.grade),
      };
      
      onAddGrade(newGrade);
      
      // REINDIRIZZAMENTO AUTOMATICO
      alert(`Voto '${newGrade.grade}' per ${newGrade.subject} aggiunto con successo. Tornando al dettaglio...`);
      navigate(`/subject/${newGrade.subject}`);
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
    <div style={{ border: '2px solid green', padding: '15px', marginTop: '10px' }}>
      <h3>FORM AGGIUNTA NUOVO VOTO</h3>
      <form onSubmit={handleSubmit}>
        {/* ... (input fields) ... */}
        <label htmlFor="exam" style={{ display: 'block', fontWeight: 'bold' }}>NOME ESAME (*)</label>
        <input type="text" id="exam" name="exam" value={formData.exam} onChange={handleChange} style={inputStyle(errors.exam)} />
        {errors.exam && <p style={{ color: 'red', fontSize: '0.8em', margin: '0 0 10px 0' }}>{errors.exam}</p>}

        <label htmlFor="subject" style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>MATERIA</label>
        <select id="subject" name="subject" value={formData.subject} onChange={handleChange} style={inputStyle(null)}>
          {subjects.map(sub => (
            <option key={sub} value={sub}>{sub}</option>
          ))}
        </select>
        
        <label htmlFor="grade" style={{ display: 'block', fontWeight: 'bold', marginTop: '10px' }}>VOTO (0-10) (*)</label>
        <input type="number" id="grade" name="grade" value={formData.grade} onChange={handleChange} step="0.1" min="0" max="10" style={inputStyle(errors.grade)} />
        {errors.grade && <p style={{ color: 'red', fontSize: '0.8em', margin: '0 0 10px 0' }}>{errors.grade}</p>}

        <button type="submit" style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: '1px solid darkgreen', marginTop: '15px', cursor: 'pointer' }}>
          AGGIUNGI VOTO
        </button>
      </form>
      <Link to="/" style={{ display: 'block', marginTop: '15px', color: 'darkblue' }}>← Annulla e torna al riepilogo</Link>
    </div>
  );
};

export default AddGradeForm;