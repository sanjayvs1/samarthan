import React, { useEffect } from "react";
import { useAsyncError, useNavigate } from "react-router-dom";
import {
  setIncrementStar,
  setUserType,
  useAppDispatch,
  useAppSelector,
} from "./redux";
import Header from "../components/Header";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className="flex relative items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="card w-96 bg-white shadow-xl rounded-lg p-6">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Login as
        </h2>

        <div className="flex flex-col space-y-6">
          {/* Student Button */}
          <button
            className="btn btn-primary btn-lg text-white font-semibold py-3 rounded-md shadow-lg transition-all duration-300 ease-in-out hover:shadow-blue-500/50 focus:ring-4 focus:ring-blue-300"
            onClick={() => {
              dispatch(setUserType({ type: "user" }));
              navigate("/portal/student");
            }}
          >
            Student
          </button>

          {/* Administrator Button */}
          <button
            className="btn btn-secondary btn-lg text-white font-semibold py-3 rounded-md shadow-lg transition-all duration-300 ease-in-out hover:shadow-purple-500/50 focus:ring-4 focus:ring-purple-300"
            onClick={() => {
              dispatch(setUserType({ type: "admin" }));
              navigate("/AdministratorLogin");
            }}
          >
            Administrator
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
