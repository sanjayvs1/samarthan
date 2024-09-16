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
  const [keywords, setKeywords] = useState<
    { keyword: string; description: string }[]
  >([]);

  // Fetch steps and start the timer
  const fetchSteps = async (question: string) => {
    try {
      setLoading(true);
      setStartTime(Date.now());
      const { data } = await axios.post("http://localhost:5000/generate-code", {
        prompt: question,
      });
      console.log(data);
      setSteps(data.code.steps);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching steps:", error);
      setLoading(false);
    }
  };

  // Update keywords when currentStep changes
  useEffect(() => {
    if (steps.length > 0) {
      const step = steps[currentStep];
      if (step && step.keywords) {
        setKeywords(
          step.keywords.map((kw: any) => ({
            keyword: kw.keyword,
            description: kw.description || "No description available",
          }))
        );
      } else {
        setKeywords([]);
      }
    }
  }, [currentStep, steps]);

  const handleSubmit = async () => {
    // Handle submission of code
    console.log("Submitted code:", code);
  };

  useEffect(() => {
    if (steps.length > 0) {
      setCode(""); // Clear the code editor when steps are updated
    }
  }, [steps]);

  useEffect(() => {
    // Update elapsed time every second
    if (startTime !== null) {
      const interval = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - startTime) / 1000));
      }, 1000);

      return () => clearInterval(interval); // Clear interval on component unmount or startTime change
    }
  }, [startTime]);

  const days = Math.floor(elapsedTime / (24 * 3600));
  const hours = Math.floor((elapsedTime % (24 * 3600)) / 3600);
  const minutes = Math.floor((elapsedTime % 3600) / 60);
  const seconds = elapsedTime % 60;

  return (
    <div className="container mx-auto p-4">
      <div className="text-center mb-4">
        <label className="input input-bordered flex items-center gap-2 mx-auto w-full max-w-md">
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

      <div className="flex">
        <div className="w-1/4">
          <div className="mb-4 font-bold">Steps</div>
          <div className="overflow-y-auto h-[calc(100vh-10rem)]">
            <ul className="steps steps-vertical">
              {steps.map((step, index) => (
                <li
                  key={step.step_id}
                  className={`step ${
                    currentStep === index ? "step-primary" : ""
                  }`}
                  onClick={() => setCurrentStep(index)}
                >
                  {step.step_title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="w-3/4 pl-4 flex gap-4">
          <div className="flex-1">
            <div className="mb-4">
              <h3 className="text-lg font-bold">Code Editor</h3>
              <MonacoEditor
                height="400px"
                language="javascript"
                value={code}
                onChange={(value) => setCode(value || "")}
                theme="vs-dark"
              />
            </div>

            <button className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>

          <div className="w-64 pl-4 border-l border-gray-300">
            <div className="mb-4 font-bold">Keywords</div>
            <div className="mockup-code">
              {keywords.length > 0 ? (
                keywords.map((item, index) => (
                  <div key={index} className="mb-2">
                    <pre data-prefix="$">
                      <code>{item.keyword}</code>
                    </pre>
                    <p className="text-sm text-gray-400 px-2">
                      #{item.description}
                    </p>
                  </div>
                ))
              ) : (
                <pre data-prefix="$">
                  <code>No keywords available</code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex gap-5">
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": days } as React.CSSProperties}></span>
          </span>
          days
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": hours } as React.CSSProperties}></span>
          </span>
          hours
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": minutes } as React.CSSProperties}></span>
          </span>
          min
        </div>
        <div>
          <span className="countdown font-mono text-4xl">
            <span style={{ "--value": seconds } as React.CSSProperties}></span>
          </span>
          sec
        </div>
      </div>
    </div>
  );
}

export default App;
