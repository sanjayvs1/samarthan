import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FaJava,
  FaPython,
  FaCuttlefish,
  FaJsSquare,
  FaReact,
  FaDatabase,
  FaLinux,
} from "react-icons/fa";
import { setLanguage, setQuestion, useAppDispatch } from "./redux";
import Header from "../components/Header";

const Portal = () => {
  const navigate = useNavigate();

  // Data for the first grid
  const firstGridCards = [
    {
      title: "Meet your AI tutor",
      description:
        "Get step-by-step algorithm hints and detailed descriptions of packages by entering your question. Perfect for personalized learning.",
      route: "/ai-tutor",
      buttonStyle: "btn-primary",
    },
    {
      title: "Project Roadmap Generator",
      description:
        "Submit a project idea and receive a step-by-step roadmap to guide you through the entire process, tailored to your needs.",
      route: "/project-roadmap",
      buttonStyle: "btn-primary",
    },
    {
      title: "Code Query Forum",
      description:
        "Submit your code issues or queries and get replies from Gen AI or other users. A great place for collaborative problem-solving.",
      route: "/forum",
      buttonStyle: "btn-primary",
    },
  ];

  // Data for the learning modules
  const modules = [
    {
      icon: <FaJava className="text-indigo-500 text-4xl mb-4" />,
      title: "Learn Java",
      description:
        "Master Java programming, including OOP concepts, advanced syntax, and real-world projects.",
      questions: 18,
      route: "/module/java",
    },
    {
      icon: <FaCuttlefish className="text-blue-500 text-4xl mb-4" />,
      title: "Learn C",
      description:
        "Dive into C programming with a focus on memory management, pointers, and efficient algorithms.",
      questions: 19,
      route: "/module/c",
    },
    {
      icon: <FaPython className="text-green-500 text-4xl mb-4" />,
      title: "Learn Python",
      description:
        "Explore Python from basics to advanced topics, such as data science, web development, and automation.",
      questions: 14,
      route: "/module/python",
    },
    {
      icon: <FaJsSquare className="text-yellow-500 text-4xl mb-4" />,
      title: "Learn JavaScript",
      description:
        "Become proficient in JavaScript, mastering DOM manipulation, modern frameworks, and event handling.",
      questions: 14,
      route: "/module/javascript",
    },
  ];

  // Data for the testing modules
  const testingModules = [
    {
      icon: <FaJsSquare className="text-yellow-500 text-4xl mb-4" />,
      title: "Learn Express",
      description:
        "Master Express.js and develop server-side applications with Node.js, routing, and middleware.",
      questions: 80,
      route: "/quiz/express",
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

  const dispatch = useAppDispatch();
  dispatch(setQuestion({ question: "" }));

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-10">
      <Header />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-10">
          Welcome to the Portal
        </h1>

        {/* First Grid: Two Cards in Single Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {firstGridCards.map((card, index) => (
            <div
              key={index}
              className="card bg-white shadow-xl rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              <h2 className="card-title text-2xl font-bold text-gray-800 mb-4">
                {card.title}
              </h2>
              <p className="text-gray-700 mb-6">{card.description}</p>
              <button
                className={`btn ${card.buttonStyle}`}
                onClick={() => navigate(card.route)}
              >
                Go to {card.title}
              </button>
            </div>
          ))}
        </div>

        {/* Heading for Learning Modules */}
        <h2 className="text-3xl font-bold text-white text-center mb-8">
          Learning Modules
        </h2>

        {/* Second Grid: Learning Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module, index) => (
            <div
              key={index}
              className="card bg-white shadow-xl rounded-lg p-6 transition duration-300 ease-in-out transform hover:scale-105"
            >
              {module.icon}
              <h2 className="card-title text-2xl font-bold text-gray-800 mb-4">
                {module.title}
              </h2>
              <p className="text-gray-700 mb-2">{module.description}</p>
              <div className="badge badge-outline mb-4">
                Questions: {module.questions}
              </div>
              <button
                className="btn btn-accent"
                onClick={() => {
                  const route = module.route;
                  const regex = /\/module\/(\w+)/;
                  const match = route.match(regex);

                  if (match) {
                    const lang = match[1];
                    dispatch(setLanguage({ language: lang }));
                  }
                  navigate(module.route);
                }}
              >
                Start Learning
              </button>
            </div>
          ))}
        </div>

        {/* Heading for Testing Modules */}
        <h2 className="text-3xl font-bold text-white text-center mt-10 mb-8">
          Testing Modules
        </h2>

        {/* Third Grid: Testing Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
    </div>
  );
};

export default Portal;
