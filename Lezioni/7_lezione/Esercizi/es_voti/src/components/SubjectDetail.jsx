// src/components/SubjectDetail.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const SubjectDetail = ({ grades, onDeleteSubject, onDeleteGrade }) => {
  const { subjectName } = useParams();
  const navigate = useNavigate();

  const subjectGrades = grades
    .filter((g) => g.subject === subjectName)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Calcolo della media
  const sum = subjectGrades.reduce((s, g) => s + g.grade, 0);
  const avg = (
    subjectGrades.length > 0 ? sum / subjectGrades.length : 0
  ).toFixed(2);

  // FUNZIONE PER ELIMINARE LA MATERIA
  const handleDeleteSubject = () => {
    if (
      window.confirm(
        `Sei sicuro di voler ELIMINARE la materia '${subjectName}'? Tutti i ${subjectGrades.length} voti associati saranno rimossi!`
      )
    ) {
      onDeleteSubject(subjectName);
      alert(`Materia '${subjectName}' eliminata.`);
      navigate("/"); // Torna alla dashboard dopo l'eliminazione
    }
  };

  // FUNZIONE PER ELIMINARE UN SINGOLO VOTO
  const handleDeleteGrade = (id, examName) => {
    if (
      window.confirm(
        `Sei sicuro di voler eliminare il voto per l'esame '${examName}'?`
      )
    ) {
      onDeleteGrade(id);
      alert(`Voto eliminato.`);
    }
  };

  return (
    <div
      className={`component-container ${
        subjectGrades.length > 0
          ? avg < 6
            ? "border-insufficient"
            : "border-sufficient"
          : ""
      }`}
    >
      <h3>DETTAGLIO VOTI PER {subjectName.toUpperCase()}</h3>

      <div className="subject-detail-header">
        <p>
          MEDIA ATTUALE:{" "}
          <span className={avg < 6 ? "grade-insufficient" : "grade-sufficient"}>
            {avg}
          </span>
        </p>

        {/* PULSANTE MODIFICA NOME (SEMPRE VISIBILE) */}
        <Link
          to={`/edit-subject/${subjectName}`}
          className="action-link link-edit"
        >
          [ MODIFICA NOME MATERIA ]
        </Link>

        {/* PULSANTE ELIMINA MATERIA (SEMPRE VISIBILE) */}
        <button
          onClick={handleDeleteSubject}
          className="action-button btn-delete-subject"
        >
          [ ELIMINA MATERIA ]
        </button>

        <Link to="/" className="link-back">
          ← Torna al riepilogo
        </Link>
      </div>

      {/* Elenco Voti */}
      <table className="styled-table">
        <thead>
          <tr>
            <th>Data</th>
            <th>Esame</th>
            <th className="text-center">Voto</th>
            <th className="text-center">Azioni</th>
          </tr>
        </thead>
        <tbody>
          {subjectGrades.map((grade) => (
            <tr
              key={grade.id}
              className={grade.grade < 6 ? "bg-insufficient" : "bg-sufficient"}
            >
              <td>{grade.date}</td>
              <td className="font-bold">{grade.exam}</td>
              <td
                className={`text-center font-bold ${
                  grade.grade < 6 ? "grade-insufficient" : "grade-sufficient"
                }`}
              >
                {grade.grade.toFixed(1)}
              </td>
              <td className="text-center">
                <Link
                  to={`/edit-grade/${grade.id}`}
                  className="action-link link-edit"
                >
                  [ MODIFICA ]
                </Link>
                <button
                  onClick={() => handleDeleteGrade(grade.id, grade.exam)}
                  className="action-button btn-delete-grade"
                  style={{ marginLeft: "10px" }}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Messaggio quando non ci sono voti */}
      {subjectGrades.length === 0 && (
        <p className="no-grades-message">
          Nessun voto presente per questa materia. Usa i pulsanti sopra per
          modificarla o eliminarla.
        </p>
      )}
    </div>
  );
};

export default SubjectDetail;
