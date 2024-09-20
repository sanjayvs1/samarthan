import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import axios from 'axios';

interface MermaidDiagramProps {
    chart: string;
}

const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chart) {
            mermaid.initialize({ startOnLoad: true });
            mermaid.contentLoaded();
        }
    }, [chart]);

    return (
        <div>
            <div ref={chartRef} className="mermaid">
                {chart}
            </div>
        </div>
    );
};

const Project = () => {
    const fetchDiagram = async (question: string) => {
        const {data} = await axios.post("http://localhost:5000/generate-diagram", { prompt: question })
        setDiagram(data.diagram);
    }
    const [question, setQuestion] = useState("");
    const diagramCode: string = `
    graph TD;
      Bruh-->B;
      A-->C;
      B-->D;
      C-->D;
      D-->A;
  `;
  const [diagram, setDiagram] = useState(diagramCode);

    return (
        <div>
            <div className="container mx-auto p-4">
                <div className="flex flex-col w-full justify-end items-center gap-x-4 mb-6">
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
                                className={`h-4 w-4 opacity-70 false ? "hidden" : ""}`}
                                onClick={() => fetchDiagram(question)}
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </label>
                    </div>
                </div>
                <h3 className="text-lg font-bold mb-3">Project Roadmap</h3>
                <MermaidDiagram chart={diagram} />
            </div>
        </div>
    )
}

export default Project;