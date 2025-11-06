
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditSubjectForm = ({ onEditSubject }) => {
  const { subjectName: oldName } = useParams();
  const [newName, setNewName] = useState(oldName);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedNewName = newName.trim();

    if (!trimmedNewName) {
      setError("Il nome della materia non può essere vuoto.");
      return;
    }
    
    const success = onEditSubject(oldName, trimmedNewName);

    if (success) {
      alert(`Materia '${oldName}' modificata in '${trimmedNewName}'.`);
      navigate(`/subject/${trimmedNewName}`);
    } else {
      setError("Errore nella modifica della materia.");
    }
  };

  return (
    <div className="form-container form-edit-subject">
      <h3>MODIFICA MATERIA: {oldName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newName">NUOVO NOME (*)</label>
          <input
            type="text"
            id="newName"
            value={newName}
            onChange={(e) => {
              setNewName(e.target.value);
              setError("");
            }}
            className={`form-input ${error ? "input-error" : ""}`}
          />
          {error && <p className="error-text">{error}</p>}
        </div>

        <button type="submit" className="btn-edit-subject">
          SALVA MODIFICHE
        </button>
      </form>
      <Link to={`/subject/${oldName}`} className="link-back">
        ← Annulla e torna al dettaglio
      </Link>
    </div>
  );
};

export default EditSubjectForm;
