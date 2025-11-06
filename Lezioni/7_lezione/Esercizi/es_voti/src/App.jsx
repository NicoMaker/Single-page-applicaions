
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import { initialGrades, initialSubjects } from "./data"; 

import SubjectList from "./components/SubjectList.jsx";
import SubjectDetail from "./components/SubjectDetail.jsx";
import AddGradeForm from "./components/AddGradeForm.jsx";
import AddSubjectForm from "./components/AddSubjectForm.jsx";
import EditSubjectForm from "./components/EditSubjectForm.jsx";
import EditGradeForm from "./components/EditGradeForm.jsx";
import "./App.css";

const App = () => {
  // LO STATO VIENE INIZIALIZZATO CON I DATI DI data.js E SI RESETTA AD OGNI REFRESH
  const [grades, setGrades] = useState(initialGrades);
  const [subjects, setSubjects] = useState(initialSubjects);

  // Funzioni di CRUD (rimanenti invariate)
  const addGrade = (newGrade) => {
    const maxId = grades.length > 0 ? Math.max(...grades.map((g) => g.id)) : 0;
    const newId = maxId + 1;
    setGrades((prevGrades) => [
      ...prevGrades,
      { ...newGrade, id: newId },
    ]);
  };

  const editGrade = (updatedGrade) => {
    setGrades((prevGrades) =>
      prevGrades.map((g) => (g.id === updatedGrade.id ? updatedGrade : g))
    );
  };

  const deleteSubject = (subjectName) => {
    setGrades((prevGrades) =>
      prevGrades.filter((g) => g.subject !== subjectName)
    );
    setSubjects((prevSubjects) =>
      prevSubjects.filter((s) => s !== subjectName)
    );
  };

  const deleteGrade = (id) => {
    setGrades((prevGrades) => prevGrades.filter((g) => g.id !== id));
  };

  const addSubject = (subjectName) => {
    if (subjects.includes(subjectName)) {
      return false;
    }
    setSubjects((prevSubjects) => [...prevSubjects, subjectName]);
    return true;
  };

  const editSubject = (oldName, newName) => {
    if (oldName !== newName && subjects.includes(newName)) {
      return false;
    }

    setSubjects((prevSubjects) =>
      prevSubjects.map((s) => (s === oldName ? newName : s))
    );

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
          <Route
            path="/"
            element={<SubjectList grades={grades} subjects={subjects} />}
          />
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
          <Route
            path="/add"
            element={<AddGradeForm subjects={subjects} onAddGrade={addGrade} />}
          />
          <Route
            path="/add-subject"
            element={<AddSubjectForm onAddSubject={addSubject} />}
          />
          <Route
            path="/edit-subject/:subjectName"
            element={<EditSubjectForm onEditSubject={editSubject} />}
          />
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