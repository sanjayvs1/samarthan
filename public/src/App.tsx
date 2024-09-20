import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Project from "./pages/Project";
import DetailsA from "./pages/DetailsA";
import Home from "./pages/Home";

// Other imports

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/project" element={<Project />} />
        <Route path="/DetailAnalysis" element={<DetailsA />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
