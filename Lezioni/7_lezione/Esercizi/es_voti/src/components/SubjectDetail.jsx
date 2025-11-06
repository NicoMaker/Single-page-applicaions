// src/components/SubjectDetail.jsx
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

const SubjectDetail = ({ grades, onDeleteSubject, onDeleteGrade }) => {
  const { subjectName } = useParams();
  const navigate = useNavigate();

  const subjectGrades = grades
    .filter((g) => g.subject === subjectName)
    // Importante: riordina i voti per data
    .sort((a, b) => new Date(b.date) - new Date(a.date)); 

  // Calcolo della media
  const sum = subjectGrades.reduce((s, g) => s + g.grade, 0);
  const avg = (
    subjectGrades.length > 0 ? sum / subjectGrades.length : 0
  ).toFixed(2);

  // FUNZIONE PER DETERMINARE SE UN VOTO È SUFFICIENTE (>= 6.0)
  const isSufficient = (grade) => grade >= 6;
  const isAvgSufficient = (avg) => parseFloat(avg) >= 6;

  // FUNZIONE PER ELIMINARE LA MATERIA (omitted for brevity)
  const handleDeleteSubject = () => {
    if (
      window.confirm(
        `Sei sicuro di voler ELIMINARE la materia '${subjectName}'? Tutti i ${subjectGrades.length} voti associati saranno rimossi!`
      )
    ) {
      onDeleteSubject(subjectName);
      alert(`Materia '${subjectName}' eliminata.`);
      navigate("/");
    }
  };

  // FUNZIONE PER ELIMINARE UN SINGOLO VOTO (omitted for brevity)
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
          ? isAvgSufficient(avg)
            ? "border-sufficient"
            : "border-insufficient"
          : ""
      }`}
    >
      <h3>DETTAGLIO VOTI PER {subjectName.toUpperCase()}</h3>

      <div className="subject-detail-header">
        <div className="subject-detail-info">
          <p>MEDIA ATTUALE</p>
          <p
            className={`avg-value ${
              isAvgSufficient(avg) ? "grade-sufficient" : "grade-insufficient"
            }`}
          >
            {avg}
          </p>
        </div>

        <div className="subject-detail-actions">
          <Link
            to={`/edit-subject/${subjectName}`}
            className="action-link link-edit"
          >
            Modifica Nome
          </Link>
          <button
            onClick={handleDeleteSubject}
            className="action-button btn-delete-subject"
          >
            Elimina Materia
          </button>
        </div>
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
          {/* L'ITERAZIONE MAP QUI SOTTO GARANTISCE CHE OGNI RIGA VENGA PROCESSATA */}
          {subjectGrades.map((grade) => (
            <tr
              key={grade.id}
              // APPLICA IL COLORE DI SFONDO (BG-COLOR) AD OGNI RIGA
              className={
                isSufficient(grade.grade) ? "bg-sufficient" : "bg-insufficient"
              }
            >
              <td>{grade.date}</td>
              <td className="font-bold">{grade.exam}</td>
              <td
                className={`text-center font-bold ${
                  // APPLICA IL COLORE AL TESTO (TEXT-COLOR) AD OGNI VOTO
                  isSufficient(grade.grade)
                    ? "grade-sufficient"
                    : "grade-insufficient"
                }`}
              >
                {grade.grade.toFixed(1)}
              </td>
              <td className="text-center">
                <Link
                  to={`/edit-grade/${grade.id}`}
                  className="action-link link-edit"
                >
                  Modifica
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

      {/* Messaggio quando non ci sono voti (omitted for brevity) */}
      {subjectGrades.length === 0 && (
        <p className="no-grades-message">
          Nessun voto presente per questa materia. Usa i pulsanti sopra per
          modificarla o eliminarla.
        </p>
      )}
      <Link to="/" className="link-back">
        ← Torna al riepilogo
      </Link>
    </div>
  );
};

export default SubjectDetail;