import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Project from "./pages/Project";
import DetailsA from "./pages/DetailsA";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import QuestionPage from "./pages/QuestionPage";
import Quiz from "./pages/Quiz";
import Sandbox from "./pages/Sandbox";

function App() {
  return (

   
     <Router>
      <Routes>
        <Route path="/ai-tutor" element={<CodeEditor />} />
        <Route path="/project-roadmap" element={<Project />} />
        <Route path="/DetailsA" element={<DetailsA />} />
        <Route path="/portal/*" element={<Portal />} />
        <Route path="/module/java" element={<QuestionPage module="Java" />} />
        <Route
          path="/module/python"
          element={<QuestionPage module="Python" />}
        />
        <Route path="/module/c" element={<QuestionPage module="C" />} />
        <Route
          path="/module/javascript"
          element={<QuestionPage module="JavaScript" />}
        />
        <Route path="/" element={<Login />} />
        <Route path="/Quiz" element={<Quiz />}></Route>
        <Route path="/sandbox" element={<Sandbox/>}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;
