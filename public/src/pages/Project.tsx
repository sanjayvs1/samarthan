import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';

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
    const diagramCode: string = `
    graph TD;
      Bruh-->B;
      A-->C;
      B-->D;
      C-->D;
      D-->A;
  `;
    return (
        <div>
            <h1>Mermaid Diagram Example</h1>
            <MermaidDiagram chart={diagramCode} />
        </div>
    )
}

export default Project;