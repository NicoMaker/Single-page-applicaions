// src/components/SubjectDetail.jsx
import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom'; 

const SubjectDetail = ({ grades, onDeleteSubject, onDeleteGrade }) => { 
  const { subjectName } = useParams(); 
  const navigate = useNavigate(); 

  const subjectGrades = grades
    .filter(g => g.subject === subjectName)
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  // Calcolo della media
  const sum = subjectGrades.reduce((s, g) => s + g.grade, 0);
  const avg = (subjectGrades.length > 0 ? sum / subjectGrades.length : 0).toFixed(2);
  
  // FUNZIONE PER ELIMINARE LA MATERIA
  const handleDeleteSubject = () => {
    if (window.confirm(`Sei sicuro di voler ELIMINARE la materia '${subjectName}'? Tutti i ${subjectGrades.length} voti associati saranno rimossi!`)) {
        onDeleteSubject(subjectName);
        alert(`Materia '${subjectName}' eliminata.`);
        navigate('/'); // Torna alla dashboard dopo l'eliminazione
    }
  };
  
  // FUNZIONE PER ELIMINARE UN SINGOLO VOTO
  const handleDeleteGrade = (id, examName) => {
    if (window.confirm(`Sei sicuro di voler eliminare il voto per l'esame '${examName}'?`)) {
        onDeleteGrade(id);
        alert(`Voto eliminato.`);
    }
  };


  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
      <h3>DETTAGLIO VOTI PER {subjectName.toUpperCase()}</h3>
      
      <div style={{ marginBottom: '10px', borderBottom: '1px dotted black', paddingBottom: '5px' }}>
          <p style={{ fontWeight: 'bold' }}>MEDIA ATTUALE: <span style={{ color: avg < 6 ? 'red' : 'green' }}>{avg}</span></p>
          
          {/* PULSANTE MODIFICA NOME (SEMPRE VISIBILE) */}
          <Link to={`/edit-subject/${subjectName}`} style={{ color: 'orange', textDecoration: 'none', fontWeight: 'bold' }}>
            [ MODIFICA NOME MATERIA ]
          </Link>
          
          {/* PULSANTE ELIMINA MATERIA (SEMPRE VISIBILE) */}
          <button 
            onClick={handleDeleteSubject} 
            style={{ 
              marginLeft: '10px', 
              padding: '5px 10px', 
              backgroundColor: 'red', 
              color: 'white', 
              border: '1px solid darkred',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}
          >
            [ ELIMINA MATERIA ]
          </button>
          
          <Link to="/" style={{ display: 'block', marginTop: '15px', color: 'darkblue' }}>← Torna al riepilogo</Link>
      </div>
      
      {/* Elenco Voti */}
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
            
            {/* Azioni per il Voto */}
            <div>
              <Link 
                to={`/edit-grade/${grade.id}`} 
                style={{ color: 'orange', fontSize: '0.8em', textDecoration: 'none', marginRight: '10px' }}
              >
                [ MODIFICA VOTO ]
              </Link>
              
              {/* PULSANTE ELIMINA VOTO */}
              <button
                onClick={() => handleDeleteGrade(grade.id, grade.exam)} 
                style={{ 
                  padding: '3px 8px', 
                  backgroundColor: 'darkred', 
                  color: 'white', 
                  border: '1px solid black',
                  fontSize: '0.7em',
                  cursor: 'pointer'
                }}
              >
                X
              </button>
            </div>
          </li>
        ))}
        {/* Messaggio quando non ci sono voti */}
        {subjectGrades.length === 0 && (
            <p style={{ color: 'gray', fontStyle: 'italic', marginTop: '10px', borderTop: '1px dotted gray', paddingTop: '5px' }}>Nessun voto presente per questa materia. Usa i pulsanti sopra per modificarla o eliminarla.</p>
        )}
      </ul>
    </div>
  );
};

export default SubjectDetail;