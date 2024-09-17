import React, { useState, useEffect } from "react";
import axios from "axios";
import MonacoEditor from "@monaco-editor/react";

function App() {
  const [question, setQuestion] = useState("");
  const [steps, setSteps] = useState<any[]>([]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState<boolean>(false);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState<number>(0);
  const [hint, setHint] = useState<boolean>(false);
  const [hintText,setHintText]=useState<string>("No hints available")
  const [keywords, setKeywords] = useState<
    { keyword: string; description: string }[]
  >([]);
  const [language, setLanguage] = useState<string>("javascript");
  const [theme, setTheme] = useState<string>("vs-dark");
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [previousStep, setPreviousStep] = useState<number | null>(null);

  // Comment templates based on language
  const commentTemplates: { [key: string]: string } = {
    javascript: "// Write your JavaScript code here",
    python: "# Write your Python code here",
    java: "// Write your Java code here",
    cpp: "// Write your C++ code here",
    c: "// Write your C code here",
  };

  // Fetch steps and start the timer
  const fetchSteps = async (question: string) => {
    try {
      setLoading(true);
      setStartTime(Date.now());
      const { data } = await axios.post("http://localhost:5000/generate-code", {
        prompt: question,
        language,
      });
      console.log(data);
      setSteps(data.code.steps);
      setCompletedSteps([]);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching steps:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (steps.length > 0) {
      const step = steps[currentStep];
      if (step && step.keywords && step.hint) {
        setKeywords(
          step.keywords.map((kw: any) => ({
            keyword: kw.keyword,
            description: kw.description || "No description available",
          }))
        );
        setHintText(step.hint || "");
      } else {
        setKeywords([]);
      }
    }
  }, [currentStep, steps]);

  const handleSubmit = () => {
    console.log("Submitted code:", code);
    setCompletedSteps((prev) => [...prev, currentStep]);
    setCurrentStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
    setPreviousStep(currentStep); // Save the current step as the previous step
  };

  useEffect(() => {
    if (steps.length > 0) {
      setCode("");
    }
  }, [steps]);

  useEffect(() => {
    if (startTime !== null) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [startTime]);

  const handleLang = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLanguage = event.target.value;
    setLanguage(newLanguage);
    setCode(commentTemplates[newLanguage] || "");
  };

  const handleTheme = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const days = Math.floor(elapsedTime / (24 * 3600));
  const hours = Math.floor((elapsedTime % (24 * 3600)) / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  const handleStepClick = (index: number) => {
    if (index <= currentStep || completedSteps.includes(index)) {
      if (index === currentStep) {
        return; // Prevent clicking on the current step
      }
      setPreviousStep(currentStep); // Save the current step as the previous step
      setCurrentStep(index);
    }
  };

  const stepSerialToIndex = (serial: number) => {
    // Convert step serial number to index (assuming serial starts from 1)
    return steps.findIndex((step) => step.step_serial === serial);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex w-full justify-end items-center gap-x-4 mb-6">
        <div className="text-center w-1/2 mb-12 mr-auto ">
          <label className="input input-bordered flex items-center gap-2 mx-auto w-full ">
            <input
              type="text"
              className="grow"
              placeholder="Search"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className={`h-4 w-4 opacity-70 ${loading ? "hidden" : ""}`}
              onClick={() => fetchSteps(question)}
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
            {loading && (
              <span className="loading loading-infinity loading-md"></span>
            )}
          </label>
        </div>
        <select
          className="select select-bordered w-26 max-w-xs"
          onChange={handleLang}
        >
          <option disabled selected>
            Language
          </option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
          <option value="javascript">JavaScript</option>
        </select>
        <select
          className="select select-bordered w-26 max-w-xs"
          onChange={handleTheme}
        >
          <option disabled selected>
            Theme
          </option>
          <option value="vs-dark">Dark</option>
          <option value="light">Light</option>
          <option value="vs-light">VS Light</option>
          <option value="hc-black">High Contrast</option>
        </select>
        <button
          className="btn btn-accent"
          onClick={() => {
            setHint(true);
          }}
        >
          hint
        </button>
        {hint && (
          <div
            className="toast toast-start"
            onClick={() => {
              setHint(false);
            }}
          >
            <div className="alert alert-info">
              <span>
                {hintText}
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="pl-4 flex gap-4">
        <div className="basis-1/5">
          <div className="mb-4 font-bold">Steps</div>
          <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            <ul className="steps steps-vertical">
              {steps.map((step, index) => (
                <li
                  key={step.step_id}
                  className={`step ${
                    currentStep === index ? "step-primary" : ""
                  } ${
                    index > currentStep && !completedSteps.includes(index)
                      ? "step-disabled"
                      : ""
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  {step.step_title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex-1 basis-3/5">
          <div className="mb-4">
            <h3 className="text-lg font-bold mb-3">Code Editor</h3>
            <MonacoEditor
              key={language}
              height="400px"
              language={language}
              value={code}
              onChange={(value) => setCode(value || "")}
              theme={theme}
              options={{
                readOnly: completedSteps.includes(currentStep),
              }}
            />
          </div>

          <button className="btn btn-primary" onClick={handleSubmit}>
            Submit
          </button>
          <div className="mt-5 bg-base-300 border">
            <p className="ml-4 font-bold">Console</p>
            <div className="bg-base-200 flex px-4 py-4"></div>
          </div>
        </div>

        <div className="w-64">
          <div className="mb-4 font-bold">Keywords</div>
          <div className="bg-base-200 border rounded-md p-4">
            <ul className="list-disc pl-5">
              {keywords.map((kw, index) => (
                <li key={index}>
                  <strong>{kw.keyword}:</strong> {kw.description}
                </li>
              ))}
            </ul>
          </div>

          <div className="fixed bottom-0 right-0 flex gap-5 z-10 bg-gray-900 bg-opacity-5 p-3 backdrop-blur-sm mix-blend-multiply">
            <div>
              <span className="countdown font-mono text-4xl">
                <span style={{ "--value": days } as React.CSSProperties}></span>
              </span>
              days
            </div>
            <div>
              <span className="countdown font-mono text-4xl">
                <span
                  style={{ "--value": hours } as React.CSSProperties}
                ></span>
              </span>
              hours
            </div>
            <div>
              <span className="countdown font-mono text-4xl">
                <span
                  style={{ "--value": minutes } as React.CSSProperties}
                ></span>
              </span>
              min
            </div>
            <div>
              <span className="countdown font-mono text-4xl">
                <span
                  style={{ "--value": seconds } as React.CSSProperties}
                ></span>
              </span>
              sec
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
