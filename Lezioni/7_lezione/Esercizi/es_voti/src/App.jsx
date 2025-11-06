// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initialGrades } from './data';
import SubjectList from './components/SubjectList.jsx';
import SubjectDetail from './components/SubjectDetail.jsx';
import AddGradeForm from './components/AddGradeForm.jsx';
import AddSubjectForm from './components/AddSubjectForm.jsx';
import EditSubjectForm from './components/EditSubjectForm.jsx'; // NUOVO COMPONENTE
import EditGradeForm from './components/EditGradeForm.jsx';     // NUOVO COMPONENTE

// Materie di base
const initialSubjects = ['Matematica', 'Italiano', 'Storia', 'Inglese'];

const App = () => {
  const [grades, setGrades] = useState(initialGrades);
  const [subjects, setSubjects] = useState(initialSubjects);
  
  // Funzione per aggiungere un nuovo voto (come prima)
  const addGrade = (newGrade) => {
    const newId = Math.max(...grades.map(g => g.id), 0) + 1;
    setGrades(prevGrades => [...prevGrades, { 
        ...newGrade, 
        id: newId, 
        date: new Date().toISOString().split('T')[0] 
    }]);
  };

  // Funzione per MODIFICARE un voto esistente
  const editGrade = (updatedGrade) => {
    setGrades(prevGrades => 
        prevGrades.map(g => g.id === updatedGrade.id ? updatedGrade : g)
    );
  };
  
  // Funzione per aggiungere una nuova materia (come prima)
  const addSubject = (newSubjectName) => {
    const capitalizedName = newSubjectName.charAt(0).toUpperCase() + newSubjectName.slice(1).toLowerCase();
    if (!subjects.includes(capitalizedName)) {
        setSubjects(prevSubjects => [...prevSubjects, capitalizedName]);
        return true;
    }
    return false; 
  };
  
  // Funzione per MODIFICARE il nome di una materia
  const editSubject = (oldName, newName) => {
    if (oldName === newName) return true;
    
    // 1. Aggiorna l'elenco delle materie
    setSubjects(prevSubjects => 
        prevSubjects.map(sub => sub === oldName ? newName : sub)
    );
    
    // 2. Aggiorna TUTTI i voti associati al vecchio nome
    setGrades(prevGrades => 
        prevGrades.map(grade => 
            grade.subject === oldName 
                ? { ...grade, subject: newName } 
                : grade
        )
    );
    return true;
  };


  const simpleStyle = { border: '1px solid black', padding: '10px', margin: '10px 0' };

  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'monospace', ...simpleStyle }}>
        <header style={{ borderBottom: '2px dashed black', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2>MONITOR Voti React</h2>
          <nav>
            <Link to="/" style={{ marginRight: '10px', color: 'blue' }}>[Dashboard Voti]</Link>
            <Link to="/add" style={{ marginRight: '10px', color: 'green' }}>[+ Voto]</Link>
            <Link to="/add-subject" style={{ color: 'purple' }}>[+ Materia]</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<SubjectList grades={grades} subjects={subjects} />} />
          <Route path="/subject/:subjectName" element={<SubjectDetail grades={grades} />} />
          
          <Route path="/add" element={<AddGradeForm subjects={subjects} onAddGrade={addGrade} />} />
          <Route path="/add-subject" element={<AddSubjectForm onAddSubject={addSubject} />} />
          
          {/* NUOVE ROTTE DI MODIFICA */}
          <Route path="/edit-subject/:subjectName" element={<EditSubjectForm onEditSubject={editSubject} />} />
          <Route path="/edit-grade/:gradeId" element={<EditGradeForm grades={grades} subjects={subjects} onEditGrade={editGrade} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;