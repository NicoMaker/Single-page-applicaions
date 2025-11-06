// src/components/SubjectList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

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
      const gradesArray = groupedGrades[subject] || []; 
      
      const count = gradesArray.length;
      
      if (count === 0) {
        return { subject, min: 'N/A', max: 'N/A', avg: 'N/A', count: 0 };
      }
      
      const sum = gradesArray.reduce((s, g) => s + g, 0);
      const avg = (sum / gradesArray.length);
      const min = Math.min(...gradesArray);
      const max = Math.max(...gradesArray);

      return { subject, min: min.toFixed(1), max: max.toFixed(1), avg: avg.toFixed(2), count };
    });
    
    return allSubjectStats;
  };

  const subjectStats = calculateStats();

  return (
    <div style={{ border: '1px solid black', padding: '10px', marginTop: '10px' }}>
      <h3>RIEPILOGO MATERIE</h3>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid black', padding: '8px' }}>Materia</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Voti Totali</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Min</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Max</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Media</th>
            <th style={{ border: '1px solid black', padding: '8px' }}>Azioni</th>
          </tr>
        </thead>
        <tbody>
          {subjectStats.map(stat => (
            <tr key={stat.subject}>
              <td style={{ border: '1px solid black', padding: '5px' }}>{stat.subject}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', fontWeight: 'bold' }}>
                {stat.count} 
              </td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{stat.min}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{stat.max}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', fontWeight: 'bold', color: (stat.avg !== 'N/A' && stat.avg < 6) ? 'red' : 'green' }}>
                {stat.avg}
              </td>
              
              {/* LINK AL DETTAGLIO: SEMPRE PRESENTE PER MATERIE ANCHE SENZA VOTI */}
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                <Link to={`/subject/${stat.subject}`} style={{ color: 'darkblue' }}>
                    DETTAGLIO
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubjectList;