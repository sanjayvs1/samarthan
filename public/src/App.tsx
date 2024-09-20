import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
import CodeEditor from './pages/CodeEditor';
import Project from './pages/Project';
import Home from './pages/Home';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/code-editor" element={<CodeEditor />} />
          <Route path="/project" element={<Project />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<Home />} />
        </Routes>
    </BrowserRouter>
  );
}

export default App;