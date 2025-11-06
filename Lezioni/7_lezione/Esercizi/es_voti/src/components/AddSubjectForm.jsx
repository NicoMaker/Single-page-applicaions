// src/components/AddSubjectForm.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AddSubjectForm = ({ onAddSubject }) => {
  const [subjectName, setSubjectName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const name = subjectName.trim();

    if (!name) {
      setError("Il nome della materia non può essere vuoto.");
      return;
    }

    // Prova ad aggiungere la materia
    const success = onAddSubject(name);

    if (success) {
      // REINDIRIZZAMENTO AUTOMATICO
      alert(
        `Materia '${name}' aggiunta con successo. Tornando al dashboard...`
      );
      navigate("/");
    } else {
      setError(`La materia '${name}' esiste già!`);
    }
  };

  const handleChange = (e) => {
    setSubjectName(e.target.value);
    setError("");
  };

  return (
    <div className="form-container form-add-subject">
      <h3>FORM AGGIUNTA MATERIA</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="subject">NOME NUOVA MATERIA (*)</label>
          <input
            type="text"
            id="subject"
            value={subjectName}
            onChange={handleChange}
            className={`form-input ${error ? "input-error" : ""}`}
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit" className="btn-add-subject">
          AGGIUNGI MATERIA
        </button>
      </form>
      <Link to="/" className="link-back">
        ← Annulla e torna al riepilogo
      </Link>
    </div>
  );
};

export default AddSubjectForm;
