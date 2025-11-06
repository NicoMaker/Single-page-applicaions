// src/components/SubjectList.jsx
import React from "react";
import { Link } from "react-router-dom";

const SubjectList = ({ grades, subjects }) => {
  // FUNZIONE PER DETERMINARE SE UN VOTO/STAT È SUFFICIENTE (>= 6.0)
  const isSufficient = (value) => parseFloat(value) >= 6;

  const calculateStats = () => {
    // 1. Raggruppa i voti esistenti per materia
    const groupedGrades = grades.reduce((acc, grade) => {
      acc[grade.subject] = acc[grade.subject] || [];
      acc[grade.subject].push(grade.grade);
      return acc;
    }, {});

    // 2. Itera su TUTTE le materie disponibili
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

  return (
    <div className="component-container">
      <h3>RIEPILOGO MATERIE</h3>

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
              {/* LOGICA PER MIN - ORA CON >= 6 */}
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
              {/* LOGICA PER MAX - ORA CON >= 6 */}
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
              {/* LOGICA PER MEDIA - ORA CON >= 6 */}
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

              {/* LINK AL DETTAGLIO */}
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