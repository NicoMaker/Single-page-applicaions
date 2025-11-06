// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { initialGrades } from './data';
import SubjectList from './components/SubjectList.jsx';
import SubjectDetail from './components/SubjectDetail.jsx';
import AddGradeForm from './components/AddGradeForm.jsx';
import AddSubjectForm from './components/AddSubjectForm.jsx';
import EditSubjectForm from './components/EditSubjectForm.jsx'; 
import EditGradeForm from './components/EditGradeForm.jsx';     

// Materie di base
const initialSubjects = ['Matematica', 'Italiano', 'Storia', 'Inglese'];

const App = () => {
  const [grades, setGrades] = useState(initialGrades);
  const [subjects, setSubjects] = useState(initialSubjects);
  
  // Funzione per aggiungere un nuovo voto
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
        prevGrades.map(g => g.id === updatedGrade.id ? { 
            ...updatedGrade, 
            grade: parseFloat(updatedGrade.grade)
        } : g)
    );
    return true;
  };

  // Funzione: Elimina un voto per ID
  const deleteGrade = (idToDelete) => {
    setGrades(prevGrades => 
        prevGrades.filter(g => g.id !== idToDelete)
    );
  };
  
  // Funzione per aggiungere una nuova materia
  const addSubject = (newSubjectName) => {
    const name = newSubjectName.trim();
    if (subjects.includes(name)) return false;
    setSubjects(prevSubjects => [...prevSubjects, name]);
    return true;
  };
  
  // Funzione per MODIFICARE una materia esistente (OK anche senza voti)
  const editSubject = (oldName, newName) => {
    const trimmedNewName = newName.trim();
    if (subjects.filter(sub => sub !== oldName).includes(trimmedNewName)) return false; 
    
    // 1. Aggiorna l'elenco delle materie
    setSubjects(prevSubjects => 
        prevSubjects.map(sub => sub === oldName ? trimmedNewName : sub)
    );
    
    // 2. Aggiorna i voti associati
    setGrades(prevGrades => 
        prevGrades.map(grade => 
            grade.subject === oldName 
                ? { ...grade, subject: trimmedNewName } 
                : grade
        )
    );
    return true;
  };

  // Funzione: Elimina una materia per nome (OK anche senza voti)
  const deleteSubject = (subjectName) => {
    // 1. Rimuovi la materia dall'elenco
    setSubjects(prevSubjects => 
        prevSubjects.filter(sub => sub !== subjectName)
    );
    
    // 2. Rimuovi tutti i voti associati a quella materia
    setGrades(prevGrades => 
        prevGrades.filter(grade => grade.subject !== subjectName)
    );
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
          {/* PASSA 'subjects' qui per SubjectList */}
          <Route path="/" element={<SubjectList grades={grades} subjects={subjects} />} /> 
          
          {/* PASSA LE FUNZIONI DI ELIMINAZIONE A SubjectDetail */}
          <Route 
            path="/subject/:subjectName" 
            element={<SubjectDetail 
                        grades={grades} 
                        onDeleteSubject={deleteSubject} 
                        onDeleteGrade={deleteGrade} 
                    />} 
          />
          
          {/* PASSA TUTTE LE FUNZIONI AI FORM */}
          <Route path="/add" element={<AddGradeForm subjects={subjects} onAddGrade={addGrade} />} />
          <Route path="/add-subject" element={<AddSubjectForm onAddSubject={addSubject} />} />
          <Route path="/edit-subject/:subjectName" element={<EditSubjectForm onEditSubject={editSubject} />} />
          <Route path="/edit-grade/:gradeId" element={<EditGradeForm grades={grades} subjects={subjects} onEditGrade={editGrade} />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;