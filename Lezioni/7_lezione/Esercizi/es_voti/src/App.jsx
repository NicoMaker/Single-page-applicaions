// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initialGrades } from './data';
import SubjectList from './components/SubjectList.jsx';
import SubjectDetail from './components/SubjectDetail.jsx';
import AddGradeForm from './components/AddGradeForm.jsx';
import AddSubjectForm from './components/AddSubjectForm.jsx'; // Nuovo Componente

// Materie di base
const initialSubjects = ['Matematica', 'Italiano', 'Storia', 'Inglese'];

const App = () => {
  const [grades, setGrades] = useState(initialGrades);
  const [subjects, setSubjects] = useState(initialSubjects); // Stato per le materie
  
  // Funzione per aggiungere un nuovo voto
  const addGrade = (newGrade) => {
    const newId = Math.max(...grades.map(g => g.id), 0) + 1;
    setGrades(prevGrades => [...prevGrades, { 
        ...newGrade, 
        id: newId, 
        date: new Date().toISOString().split('T')[0] 
    }]);
  };

  // Funzione per aggiungere una nuova materia
  const addSubject = (newSubjectName) => {
    if (!subjects.includes(newSubjectName)) {
        setSubjects(prevSubjects => [...prevSubjects, newSubjectName]);
        return true;
    }
    return false; // Materia già esistente
  };

  const simpleStyle = { border: '1px solid black', padding: '10px', margin: '10px 0' };

  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'monospace', ...simpleStyle }}>
        <header style={{ borderBottom: '2px dashed black', paddingBottom: '10px', marginBottom: '20px' }}>
          <h2>MONITOR Voti React (Brutto) 💾</h2>
          <nav>
            <Link to="/" style={{ marginRight: '10px', color: 'blue' }}>[Dashboard Voti]</Link>
            <Link to="/add" style={{ marginRight: '10px', color: 'green' }}>[+ Voto]</Link>
            <Link to="/add-subject" style={{ color: 'purple' }}>[+ Materia]</Link>
          </nav>
        </header>

        <Routes>
          <Route path="/" element={<SubjectList grades={grades} />} />
          <Route path="/subject/:subjectName" element={<SubjectDetail grades={grades} />} />
          <Route path="/add" element={<AddGradeForm subjects={subjects} onAddGrade={addGrade} />} />
          {/* Nuovo Route per aggiungere materia */}
          <Route path="/add-subject" element={<AddSubjectForm onAddSubject={addSubject} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;