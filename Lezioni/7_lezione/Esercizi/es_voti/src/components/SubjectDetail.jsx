// src/components/SubjectDetail.jsx
import React from 'react';
import { useParams, Link } from 'react-router-dom';

const SubjectDetail = ({ grades }) => {
  const { subjectName } = useParams(); 

  const subjectGrades = grades
    .filter(g => g.subject === subjectName)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  // ... (calcolo media come prima) ...
  const sum = subjectGrades.reduce((s, g) => s + g.grade, 0);
  const avg = (subjectGrades.length > 0 ? sum / subjectGrades.length : 0).toFixed(2);

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
      <h3>DETTAGLIO VOTI PER {subjectName.toUpperCase()}</h3>
      
      <div style={{ marginBottom: '10px', borderBottom: '1px dotted black', paddingBottom: '5px' }}>
          <p style={{ fontWeight: 'bold' }}>MEDIA ATTUALE: <span style={{ color: avg < 6 ? 'red' : 'green' }}>{avg}</span></p>
          <Link to={`/edit-subject/${subjectName}`} style={{ color: 'orange', textDecoration: 'none', fontWeight: 'bold' }}>
            [ MODIFICA NOME MATERIA ]
          </Link>
          <Link to="/" style={{ display: 'block', marginTop: '5px', color: 'darkblue' }}>← Torna al riepilogo</Link>
      </div>
      
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {subjectGrades.map((grade) => (
          <li 
            key={grade.id} 
            style={{ 
              border: '1px dashed gray', 
              padding: '8px', 
              marginBottom: '5px',
              backgroundColor: grade.grade < 6 ? 'pink' : 'lightgreen',
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <div>
                {grade.date} | 
                **{grade.exam}**: 
                <span style={{ fontWeight: 'bold', marginLeft: '5px', color: grade.grade < 6 ? 'red' : 'green' }}>
                    {grade.grade.toFixed(1)}
                </span>
            </div>
            <Link to={`/edit-grade/${grade.id}`} style={{ color: 'orange', fontSize: '0.8em', textDecoration: 'none' }}>
                [ MODIFICA VOTO ]
            </Link>
          </li>
        ))}
      </ul>
      {subjectGrades.length === 0 && <p>Nessun voto in questa materia.</p>}
    </div>
  );
};

export default SubjectDetail;