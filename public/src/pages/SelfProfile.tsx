import React from 'react'
import { useAppSelector } from './redux'
import ProfileCard from '../components/ProfileCard'
import { FaDatabase, FaJsSquare, FaLinux, FaReact } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SelfProfile = () => {
    
    const profile = useAppSelector((store) => store.userInfo.userInfo)
    const testingModules = [
      {
        icon: <FaJsSquare className="text-yellow-500 text-4xl mb-4" />,
        title: "Learn Express",
        description:
          "Master Express.js and develop server-side applications with Node.js, routing, and middleware.",
        questions: 80,
        route: "/quiz/artificialintelligence",
      },
      {
        icon: <FaReact className="text-blue-500 text-4xl mb-4" />,
        title: "Learn React",
        description:
          "Master React.js, create dynamic UIs, and learn about state management, hooks, and more.",
        questions: 100,
        route: "/quiz/react",
      },
      {
        icon: <FaDatabase className="text-green-500 text-4xl mb-4" />,
        title: "Learn SQL",
        description:
          "Master SQL database querying and learn how to handle data with relational databases.",
        questions: 70,
        route: "/quiz/sql",
      },
      {
        icon: <FaLinux className="text-gray-500 text-4xl mb-4" />,
        title: "Learn Linux",
        description:
          "Explore Linux commands, shell scripting, file systems, and server administration.",
        questions: 90,
        route: "/quiz/linux",
      },
    ];

    const navigate = useNavigate();
  return (
    <div className="flex flex-wrap flex-col justify-center items-center gap-y-4">
        <div className='w-full flex justify-center items-center'><ProfileCard profile={profile} /></div>
        <h1 className=' font-mono font-bold text-3xl mb-3'>Suggestions</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-16">
          {testingModules.map((module, index) => (
            <div
              key={index}
              className="card bg-white shadow-xl rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {module.icon}
              <h2 className="card-title text-2xl font-bold text-gray-800 mb-4">
                {module.title}
              </h2>
              <p className="text-gray-700 mb-2">{module.description}</p>

              <button
                className="btn btn-accent"
                onClick={() => navigate(module.route)}
              >
                Start Testing
              </button>
            </div>
          ))}
        </div>
  </div>
  )
}

export default SelfProfile
