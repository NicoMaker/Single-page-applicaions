// src/components/SubjectList.jsx
import React from "react";
import { Link } from "react-router-dom";

const SubjectList = ({ grades, subjects }) => {
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
              <td
                className={`text-center ${
                  stat.avg !== "N/A" && stat.min < 6 ? "grade-insufficient" : ""
                }`}
              >
                {stat.min}
              </td>
              <td
                className={`text-center ${
                  stat.avg !== "N/A" && stat.max < 6 ? "grade-insufficient" : ""
                }`}
              >
                {stat.max}
              </td>
              <td
                className={`text-center font-bold ${
                  stat.avg !== "N/A"
                    ? stat.avg < 6
                      ? "grade-insufficient"
                      : "grade-sufficient"
                    : ""
                }`}
              >
                {stat.avg}
              </td>

              {/* LINK AL DETTAGLIO: SEMPRE PRESENTE PER MATERIE ANCHE SENZA VOTI */}
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
