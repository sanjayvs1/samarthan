import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Project from "./pages/Project";
import DetailsA from "./pages/DetailsA";
import Login from "./pages/Login";
import Portal from "./pages/Portal";

// Other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/ai-tutor" element={<CodeEditor />} />
        <Route path="/project-roadmap" element={<Project />} />
        <Route path="/DetailsA" element={<DetailsA />} />
        <Route path="/portal/*" element={<Portal />} />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
