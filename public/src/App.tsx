import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import CodeEditor from "./pages/CodeEditor";
import Project from "./pages/Project";
import DetailsA from "./pages/DetailsA";
import Login from "./pages/Login";
import Portal from "./pages/Portal";
import QuestionPage from "./pages/QuestionPage";
import Quiz from "./pages/Quiz";

// Import FontAwesome for profile icon (optional)
import SelfProfile from "./pages/SelfProfile";
import Profiles from "./pages/Profiles";

function App() {
 
  return (
    <>
     
      <Router>
        <Routes>
          <Route path="/ai-tutor" element={<CodeEditor />} />
          <Route path="/project-roadmap" element={<Project />} />
          <Route path="/DetailsA" element={<DetailsA />} />
          <Route path="/portal/*" element={<Portal />} />
          <Route path="/module/java" element={<QuestionPage module="Java" />} />
          <Route path="/your-profile" element={<SelfProfile />} />
          <Route path="/profiles" element={<Profiles />} />
          <Route
            path="/module/python"
            element={<QuestionPage module="Python" />}
          />
          <Route path="/module/c" element={<QuestionPage module="C" />} />
          <Route
            path="/module/javascript"
            element={<QuestionPage module="JavaScript" />}
          />
          <Route path="/quiz/:id" element={<Quiz />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
