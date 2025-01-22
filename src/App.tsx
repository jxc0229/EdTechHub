import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProjectList from './components/ProjectList';
import ProjectDetail from './components/ProjectDetail';
import ProjectSubmission from './components/ProjectSubmission';

function App() {
  return (
    <div className="min-h-screen bg-orange-50">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/submit" element={<ProjectSubmission />} />
      </Routes>
    </div>
  );
}

export default App;