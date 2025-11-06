// src/components/EditGradeForm.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditGradeForm = ({ grades, subjects, onEditGrade }) => {
  const { gradeId } = useParams();
  const navigate = useNavigate();

  const numericGradeId = parseInt(gradeId, 10);
  const originalGrade = grades.find((g) => g.id === numericGradeId);

  if (!originalGrade) {
    return (
      <div className="component-container" style={{ borderColor: "#c62828" }}>
        <h3>ERRORE GRAVE</h3>
        <p className="error-text">Voto con ID {gradeId} non trovato.</p>
        <Link to="/" className="link-back">
          Torna al Dashboard
        </Link>
      </div>
    );
  }

  const [formData, setFormData] = useState({
    exam: originalGrade.exam,
    subject: originalGrade.subject,
    grade: originalGrade.grade.toString(),
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    const newErrors = {};
    const gradeValue = parseFloat(formData.grade);

    if (!formData.exam.trim()) newErrors.exam = "Nome esame richiesto.";

    if (formData.grade === "") {
      newErrors.grade = "Voto richiesto.";
    } else if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 10) {
      newErrors.grade = "Voto deve essere tra 0 e 10.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const updatedGrade = {
        id: numericGradeId,
        exam: formData.exam.trim(),
        subject: formData.subject,
        grade: parseFloat(formData.grade),
        date: originalGrade.date,
      };

      const success = onEditGrade(updatedGrade);

      if (success) {
        // REINDIRIZZAMENTO AUTOMATICO
        alert(
          `Voto modificato con successo. Tornando al dettaglio di ${updatedGrade.subject}...`
        );
        navigate(`/subject/${updatedGrade.subject}`);
      }
    }
  };

  return (
    <div className="form-container form-edit-grade">
      <h3>
        MODIFICA VOTO: {originalGrade.exam} ({originalGrade.subject})
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exam">NOME ESAME (*)</label>
          <input
            type="text"
            id="exam"
            name="exam"
            value={formData.exam}
            onChange={handleChange}
            className={`form-input ${errors.exam ? "input-error" : ""}`}
          />
          {errors.exam && <p className="error-text">{errors.exam}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="subject">MATERIA</label>
          <select
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            className="form-input"
          >
            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="grade">VOTO (0-10) (*)</label>
          <input
            type="number"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
            step="0.1"
            min="0"
            max="10"
            className={`form-input ${errors.grade ? "input-error" : ""}`}
          />
          {errors.grade && <p className="error-text">{errors.grade}</p>}
        </div>

        <button type="submit" className="btn-edit-grade">
          SALVA MODIFICHE
        </button>
      </form>
      <Link to={`/subject/${originalGrade.subject}`} className="link-back">
        ← Annulla e torna al dettaglio
      </Link>
    </div>
  );
};

export default EditGradeForm;
