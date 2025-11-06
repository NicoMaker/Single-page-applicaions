// src/App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { initialGrades } from "./data";
import SubjectList from "./components/SubjectList.jsx";
import SubjectDetail from "./components/SubjectDetail.jsx";
import AddGradeForm from "./components/AddGradeForm.jsx";
import AddSubjectForm from "./components/AddSubjectForm.jsx";
import EditSubjectForm from "./components/EditSubjectForm.jsx";
import EditGradeForm from "./components/EditGradeForm.jsx";
import "./App.css"; // Importa il foglio di stile

// Materie di base (assumendo che siano queste le initialSubjects)
const initialSubjects = ["Matematica", "Italiano", "Storia", "Inglese", "Scienze", "Informatica"];

const App = () => {
  const [grades, setGrades] = useState(initialGrades);
  const [subjects, setSubjects] = useState(initialSubjects);

  // Funzione per aggiungere un nuovo voto
  const addGrade = (newGrade) => {
    const newId = Math.max(...grades.map((g) => g.id), 0) + 1;
    setGrades((prevGrades) => [
      ...prevGrades,
      {
        ...newGrade,
        id: newId,
        // La data (newGrade.date) ORA viene dal form AddGradeForm
      },
    ]);
  };

  // Funzione per MODIFICARE un voto esistente
  const editGrade = (updatedGrade) => {
    setGrades((prevGrades) =>
      prevGrades.map((g) => (g.id === updatedGrade.id ? updatedGrade : g))
    );
  };

  // Funzione per eliminare una materia e tutti i suoi voti
  const deleteSubject = (subjectName) => {
    // Rimuove tutti i voti associati
    setGrades((prevGrades) =>
      prevGrades.filter((g) => g.subject !== subjectName)
    );
    // Rimuove la materia dalla lista
    setSubjects((prevSubjects) =>
      prevSubjects.filter((s) => s !== subjectName)
    );
  };

  // Funzione per eliminare un singolo voto
  const deleteGrade = (id) => {
    setGrades((prevGrades) => prevGrades.filter((g) => g.id !== id));
  };

  // Funzione per aggiungere una materia
  const addSubject = (subjectName) => {
    if (subjects.includes(subjectName)) {
      return false; // Fallito: la materia esiste già
    }
    setSubjects((prevSubjects) => [...prevSubjects, subjectName]);
    return true; // Successo
  };

  // Funzione per MODIFICARE il nome di una materia
  const editSubject = (oldName, newName) => {
    // 1. Controlla se il nuovo nome è già in uso
    if (oldName !== newName && subjects.includes(newName)) {
      return false;
    }

    // 2. Aggiorna il nome della materia nella lista delle subjects
    setSubjects((prevSubjects) =>
      prevSubjects.map((s) => (s === oldName ? newName : s))
    );

    // 3. Aggiorna il nome della materia in tutti i voti
    setGrades((prevGrades) =>
      prevGrades.map((g) =>
        g.subject === oldName ? { ...g, subject: newName } : g
      )
    );
    return true;
  };

  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h2>Registro Voti App</h2>
          <nav>
            <Link to="/" className="nav-dashboard">
              Dashboard
            </Link>
            <Link to="/add" className="nav-add-grade">
              [+ Voto]
            </Link>
            <Link to="/add-subject" className="nav-add-subject">
              [+ Materia]
            </Link>
          </nav>
        </header>

        <Routes>
          {/* Dashboard */}
          <Route
            path="/"
            element={<SubjectList grades={grades} subjects={subjects} />}
          />

          {/* Dettaglio Materia (dove sono tutti i voti) */}
          <Route
            path="/subject/:subjectName"
            element={
              <SubjectDetail
                grades={grades}
                onDeleteSubject={deleteSubject}
                onDeleteGrade={deleteGrade}
              />
            }
          />

          {/* Form Aggiunta Voto */}
          <Route
            path="/add"
            element={<AddGradeForm subjects={subjects} onAddGrade={addGrade} />}
          />

          {/* Form Aggiunta Materia */}
          <Route
            path="/add-subject"
            element={<AddSubjectForm onAddSubject={addSubject} />}
          />

          {/* Form Modifica Materia */}
          <Route
            path="/edit-subject/:subjectName"
            element={<EditSubjectForm onEditSubject={editSubject} />}
          />

          {/* Form Modifica Voto */}
          <Route
            path="/edit-grade/:gradeId"
            element={
              <EditGradeForm
                grades={grades}
                subjects={subjects}
                onEditGrade={editGrade}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;