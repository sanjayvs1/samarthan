import React, { useState } from 'react';

const CreateAssignment = () => {
  const [lang, setLang] = useState<string>("");

  const handleSubmit = () => {
    // Empty handleSubmit function as requested
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="card w-full max-w-lg bg-gray-800 shadow-xl rounded-lg p-6">
        <h1 className="text-3xl font-bold mb-4 text-center text-white">Create Assignment</h1>
        <form>
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text text-lg text-gray-300">Add your Question</span>
            </label>
            <textarea
              className="textarea textarea-bordered h-28 w-full bg-gray-100 text-gray-800 placeholder-gray-500"
              placeholder="Post your question"
            ></textarea>
          </div>

          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text text-lg text-gray-300">Select Language</span>
            </label>
            <select
              className="select select-bordered w-full bg-gray-100 text-gray-800"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLang(e.target.value)}
            >
              <option disabled selected>
                Choose a language
              </option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
            </select>
          </div>

          <div className="form-control">
            <button
              type="button"
              className="btn btn-outline w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold"
              onClick={handleSubmit}
            >
              Submit Assignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
