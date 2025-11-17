import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const today = new Date().toISOString().split('T')[0];

const AddGradeForm = ({ subjects, onAddGrade }) => {
  const [formData, setFormData] = useState({
    exam: "",
    subject: subjects[0] || "",
    grade: "",
    date: today, 
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

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

    if (!formData.date) newErrors.date = "Data richiesta.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const newGrade = {
        exam: formData.exam.trim(),
        subject: formData.subject,
        grade: parseFloat(formData.grade),
        date: formData.date, // INCLUSO: Passa la data al componente App
      };

      onAddGrade(newGrade);

      alert(
        `Voto '${newGrade.grade}' per ${newGrade.subject} aggiunto con successo. Tornando al dettaglio...`
      );
      navigate(`/subject/${newGrade.subject}`);
    }
  };

  return (
    <div className="form-container form-add-grade">
      <h3>FORM AGGIUNTA NUOVO VOTO</h3>
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

        <div className="form-group">
          <label htmlFor="date">DATA (*)</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className={`form-input ${errors.date ? "input-error" : ""}`}
          />
          {errors.date && <p className="error-text">{errors.date}</p>}
        </div>

        <button type="submit" className="btn-add-grade">
          AGGIUNGI VOTO
        </button>
      </form>
      <Link to="/" className="link-back">
        ← Annulla e torna al riepilogo
      </Link>
    </div>
  );
};

export default AddGradeForm;
