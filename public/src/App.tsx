import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CodeEditor from './pages/CodeEditor';
import Project from './pages/Project';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/code-editor" element={<CodeEditor/>} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </Router>
  );
}

export default App;