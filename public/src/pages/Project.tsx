import React, { useEffect, useState, useRef } from 'react';
import mermaid from 'mermaid';
import axios from 'axios';
import markdownIt from 'markdown-it';
import './Project.css'

interface MermaidDiagramProps {
    chart: string;
}

const md = markdownIt();
const MermaidDiagram: React.FC<MermaidDiagramProps> = ({ chart }) => {
    const [isChartLoaded, setIsChartLoaded] = useState(false);
    const chartRef = useRef(null);
    useEffect(() => {
        if (chart && !isChartLoaded) {
            mermaid.initialize({ startOnLoad: true });
            mermaid.contentLoaded();
            setIsChartLoaded(true);
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
    const [loading, setLoading] = useState<boolean>(false);
    const [result, setResult] = useState(null);
    const [question, setQuestion] = useState("");

    const fetchDiagram = async (question: string) => {
        const { data } = await axios.post("http://localhost:5000/generate-diagram", { prompt: question })
        setDiagram(data.diagram);
        console.log(data.diagram)
    }
    const fetchResult = async (question: string) => {
        setLoading(true)
        fetchDiagram(question);
        const { data } = await axios.post("http://localhost:5000/generate-roadmap", { topic: question })
        setResult(data.result);
        console.log(data.result)
        setLoading(false)
    }
    const diagramCode: string = `
    graph TD
      Sample-->B
      A-->C
      B-->D
      C-->D
      D-->A
  `;
    const [diagram, setDiagram] = useState(diagramCode);
    useEffect(() => {
        if (result) {
            const html = md.render(result);
            const element = document.getElementById('detailed-explanation');
            if (element) element.innerHTML = html;
        }
    }, [result]);

    return (
        <div>
            <div className="container mx-auto p-4 max-w-4xl">
                <div className="flex flex-col w-full justify-end items-center gap-x-4 mb-6">
                    <div className="text-center w-1/2 mb-12 mr-auto mx-auto ">
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
                                onClick={() => fetchResult(question)}
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
                </div>
                <h3 className="text-lg font-bold mb-3">Project Roadmap</h3>
                <MermaidDiagram key={diagram} chart={diagram} />
                <br />
                {
                    result && (
                        <>
                            <h3 className="text-lg font-bold mb-3">Detailed Explanation</h3>
                            <div id="detailed-explanation"></div>
                        </>
                    )
                }

            </div>
        </div>
    )
}

export default Project;