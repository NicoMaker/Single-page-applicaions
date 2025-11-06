// src/components/SubjectDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SubjectDetail = ({ grades }) => {
  const { subjectName } = useParams(); 

  const subjectGrades = grades
    .filter(g => g.subject === subjectName)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  if (subjectGrades.length === 0) {
    // Non dovrebbe succedere se arriviamo da SubjectList, ma per sicurezza.
    return (
      <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
        <h3>DETTAGLIO: {subjectName}</h3>
        <p>ERRORE: Voti non trovati.</p>
        <Link to="/">[Torna Indietro]</Link>
      </div>
    );
  }

  const sum = subjectGrades.reduce((s, g) => s + g.grade, 0);
  const avg = (sum / subjectGrades.length).toFixed(2);

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
      <h3>DETTAGLIO VOTI PER {subjectName.toUpperCase()}</h3>
      <p style={{ fontWeight: 'bold' }}>MEDIA ATTUALE: <span style={{ color: avg < 6 ? 'red' : 'green' }}>{avg}</span></p>
      
      <Link to="/" style={{ display: 'block', marginBottom: '10px', color: 'darkblue' }}>← Torna al riepilogo</Link>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {subjectGrades.map((grade) => (
          <li 
            key={grade.id} 
            style={{ 
              border: '1px dashed gray', 
              padding: '8px', 
              marginBottom: '5px',
              backgroundColor: grade.grade < 6 ? 'pink' : 'lightgreen',
            }}
          >
            {grade.date} | 
            **{grade.exam}**: 
            <span style={{ fontWeight: 'bold', marginLeft: '5px', color: grade.grade < 6 ? 'red' : 'green' }}>
                {grade.grade.toFixed(1)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SubjectDetail;