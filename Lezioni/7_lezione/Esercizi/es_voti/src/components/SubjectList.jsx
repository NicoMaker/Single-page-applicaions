// src/components/SubjectList.jsx
import React from "react";
import { Link } from "react-router-dom";

const SubjectList = ({ grades, subjects }) => {
  // Funzione helper per la sufficienza
  const isSufficient = (value) => parseFloat(value) >= 6;

  const calculateStats = () => {
    const groupedGrades = grades.reduce((acc, grade) => {
      acc[grade.subject] = acc[grade.subject] || [];
      acc[grade.subject].push(grade.grade);
      return acc;
    }, {});

    const allSubjectStats = subjects.map((subject) => {
      const gradesArray = groupedGrades[subject] || [];

      const count = gradesArray.length;

      if (count === 0) {
        return { subject, min: "N/A", max: "N/A", avg: "N/A", count: 0 };
      }

      const sum = gradesArray.reduce((s, g) => s + g, 0);
      const avg = sum / gradesArray.length;
      const min = Math.min(...gradesArray);
      const max = Math.max(...gradesArray);

      return {
        subject,
        min: min.toFixed(1),
        max: max.toFixed(1),
        avg: avg.toFixed(2),
        count,
      };
    });

    return allSubjectStats;
  };

  const subjectStats = calculateStats();

  // NUOVO CALCOLO: MEDIA COMPLESSIVA
  const totalGradesCount = grades.length;
  const totalGradesSum = grades.reduce((sum, grade) => sum + grade.grade, 0);
  const overallAvg =
    totalGradesCount > 0 ? (totalGradesSum / totalGradesCount).toFixed(2) : "N/A";
  
  const isOverallAvgSufficient = isSufficient(overallAvg);

  // MESSAGGIO SE NON CI SONO MATERIE/VOTI
  if (subjects.length === 0) {
    return (
      <div className="component-container no-data-container">
        <h3>Dashboard Voti</h3>
        <p className="no-grades-message">
          Non hai ancora aggiunto nessuna materia. Usa il pulsante
          **[+ Materia]** nel menu in alto per iniziare!
        </p>
      </div>
    );
  }

  return (
    <div className="component-container">
      <h3>RIEPILOGO MATERIE</h3>

      {/* BOX MEDIA COMPLESSIVA */}
      <div className="overall-avg-box">
        <p className="avg-label">MEDIA COMPLESSIVA GENERALE</p>
        <p
          className={`overall-avg-value ${
            isOverallAvgSufficient ? "grade-sufficient" : "grade-insufficient"
          }`}
        >
          {overallAvg}
        </p>
      </div>
      {/* FINE BOX MEDIA COMPLESSIVA */}

      <table className="styled-table">
        <thead>
          <tr>
            <th>Materia</th>
            <th className="text-center">Voti Totali</th>
            <th className="text-center">Min</th>
            <th className="text-center">Max</th>
            <th className="text-center">Media</th>
            <th className="text-center">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {subjectStats.map((stat) => (
            <tr key={stat.subject}>
              <td className="font-bold">{stat.subject}</td>
              <td className="text-center font-bold">{stat.count}</td>
              {/* Voto Minimo */}
              <td
                className={`text-center ${
                  stat.min !== "N/A"
                    ? isSufficient(stat.min)
                      ? "grade-sufficient"
                      : "grade-insufficient"
                    : ""
                }`}
              >
                {stat.min}
              </td>
              {/* Voto Massimo */}
              <td
                className={`text-center ${
                  stat.max !== "N/A"
                    ? isSufficient(stat.max)
                      ? "grade-sufficient"
                      : "grade-insufficient"
                    : ""
                }`}
              >
                {stat.max}
              </td>
              {/* Media Materia */}
              <td
                className={`text-center font-bold ${
                  stat.avg !== "N/A"
                    ? isSufficient(stat.avg)
                      ? "grade-sufficient"
                      : "grade-insufficient"
                    : ""
                }`}
              >
                {stat.avg}
              </td>

              {/* Link al Dettaglio */}
              <td className="text-center">
                <Link
                  to={`/subject/${stat.subject}`}
                  className="action-link link-detail"
                >
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