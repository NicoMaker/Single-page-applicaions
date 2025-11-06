// src/components/SubjectList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

// DEVE ricevere anche la prop 'subjects'
const SubjectList = ({ grades, subjects }) => { 
  
  const calculateStats = () => {
    // 1. Raggruppa i voti esistenti per materia
    const groupedGrades = grades.reduce((acc, grade) => {
      acc[grade.subject] = acc[grade.subject] || [];
      acc[grade.subject].push(grade.grade);
      return acc;
    }, {});

    // 2. Itera su TUTTE le materie disponibili
    const allSubjectStats = subjects.map(subject => {
      const gradesArray = groupedGrades[subject] || []; // Prende i voti, o un array vuoto
      
      const count = gradesArray.length;
      
      // Se non ci sono voti, min, max e avg sono 0 o N/A
      if (count === 0) {
        return { subject, min: 'N/A', max: 'N/A', avg: 'N/A', count: 0 };
      }
      
      const sum = gradesArray.reduce((s, g) => s + g, 0);
      const avg = (sum / gradesArray.length);
      const min = Math.min(...gradesArray);
      const max = Math.max(...gradesArray);

      return { subject, min: min.toFixed(1), max: max.toFixed(1), avg: avg.toFixed(2), count };
    });
    
    // Ordina le statistiche per nome della materia (opzionale, ma utile)
    return allSubjectStats.sort((a, b) => a.subject.localeCompare(b.subject));
  };

  const subjectStats = calculateStats();

  return (
    <div>
      <h3>DASHBOARD MATERIE (con zeri)</h3>
      <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'lightgray' }}>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>MATERIA</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>VOTI TOTALI</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>MIN</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>MAX</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>MEDIA</th>
            <th style={{ border: '1px solid black', padding: '5px' }}>#</th>
          </tr>
        </thead>
        <tbody>
          {subjectStats.map((stat) => (
            <tr key={stat.subject}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{stat.subject}</td>
              
              {/* Voti totali: 0 è OK */}
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                {stat.count} 
              </td>
              
              {/* Minimo, Massimo, Media: mostrano N/A se Count è 0 */}
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{stat.min}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{stat.max}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', fontWeight: 'bold', color: (stat.avg !== 'N/A' && stat.avg < 6) ? 'red' : 'green' }}>
                {stat.avg}
              </td>
              
              {/* Link al dettaglio: solo se ci sono voti (opzionale, per evitare pagine vuote) */}
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                {stat.count > 0 ? (
                    <Link to={`/subject/${stat.subject}`} style={{ color: 'darkblue' }}>DETTAGLIO</Link>
                ) : (
                    <span style={{ color: 'gray', fontSize: '0.8em' }}>N/D</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {subjectStats.length === 0 && <p style={{ marginTop: '10px' }}>[ NESSUNA MATERIA INSERITA ]</p>}
    </div>
  );
};

export default SubjectList;