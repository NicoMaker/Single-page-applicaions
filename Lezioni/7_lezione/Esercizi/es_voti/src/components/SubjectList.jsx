// src/components/SubjectList.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const SubjectList = ({ grades }) => {
  const calculateStats = () => {
    // Raggruppa e calcola min/max/media
    const groupedGrades = grades.reduce((acc, grade) => {
      acc[grade.subject] = acc[grade.subject] || [];
      acc[grade.subject].push(grade.grade);
      return acc;
    }, {});

    return Object.entries(groupedGrades).map(([subject, gradesArray]) => {
      const sum = gradesArray.reduce((s, g) => s + g, 0);
      const avg = (sum / gradesArray.length);
      const min = Math.min(...gradesArray);
      const max = Math.max(...gradesArray);

      return { subject, min, max, avg: avg.toFixed(2) };
    });
  };

  const subjectStats = calculateStats();

  return (
    <div>
      <h3>DASHBOARD MATERIE</h3>
      <table style={{ width: '100%', border: '1px solid black', borderCollapse: 'collapse' }}>
        <thead style={{ backgroundColor: 'lightgray' }}>
          <tr>
            <th style={{ border: '1px solid black', padding: '5px' }}>MATERIA</th>
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
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{stat.min.toFixed(1)}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>{stat.max.toFixed(1)}</td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center', fontWeight: 'bold', color: stat.avg < 6 ? 'red' : 'green' }}>
                {stat.avg}
              </td>
              <td style={{ border: '1px solid black', padding: '5px', textAlign: 'center' }}>
                <Link to={`/subject/${stat.subject}`} style={{ color: 'darkblue' }}>DETTAGLIO</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {subjectStats.length === 0 && <p style={{ marginTop: '10px' }}>[ NESSUN VOTO INSERITO ]</p>}
    </div>
  );
};

export default SubjectList;