import Navbar from "../components/Navbar"

const Landing = () => {
    return (
        <div className="h-screen w-full bg-slate-950">
            <Navbar></Navbar>
            <div className="flex flex-col items-center justify-center gap-2 py-[100px] text-slate-100">
                <h1 className="text-5xl font-robotoslab font-bold">Samarthan</h1>
                <br />
                <div className="text-lg font-robotoslab">Learn to Code Smarter with AI: Coding Tutor, Personalized Roadmaps and Hands-On Guidance for Your Projects</div>
            </div>
            <div className="flex p-10 space-x-5 items-center justify-center">
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">AI Coding Tutor</h2>
                        <p>Learn coding with step by step guide with hints!</p>
                        <div className="card-actions justify-end">
                            <button className="btn">Check out!</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">Project Roadmap</h2>
                        <p>Get detailed Roadmap and Diagram for any project topic!</p>
                        <div className="card-actions justify-end">
                            <button className="btn">Check out!</button>
                        </div>
                    </div>
                </div>
                <div className="card bg-primary text-primary-content w-96">
                    <div className="card-body">
                        <h2 className="card-title">AI Generated Quizzes</h2>
                        <p>Get AI Generated Quizzes on any topic of choice!</p>
                        <div className="card-actions justify-end">
                            <button className="btn">Check out!</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing