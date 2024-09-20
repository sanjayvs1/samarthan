import { BrowserRouter, Routes, Route } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Project from "./pages/Project";
import Test from "./pages/Test";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/code-editor" element={<CodeEditor />} />
        <Route path="/project" element={<Project />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
