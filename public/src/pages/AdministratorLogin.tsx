import axios from "axios";
import React, { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { setUserType, useAppDispatch } from "./redux";

const AdministratorLogin = () => {
  const [admindata, setadmindata] = useState({ adminName: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:5000/authAdmin", {
        adminName: admindata.adminName,
        password: admindata.password,
      });
      console.log(data.success);
      if (data.success) {
        dispatch(setUserType({ type: "admin" }));
        navigate("/portal/admin");
      }
      // You can navigate to another page if login is successful
      // navigate('/dashboard');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="card w-96 bg-white shadow-xl rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Administrator Login
        </h2>
        <form className="flex flex-col space-y-6" onSubmit={handleSubmit}>
          <input
            type="text"
            value={admindata.adminName}
            onChange={(e) =>
              setadmindata({ ...admindata, adminName: e.target.value })
            }
            placeholder="Admin Name"
            className="input input-primary input-bordered bg-white w-full max-w-xs focus:ring focus:ring-indigo-300"
          />
          <input
            type="password"
            value={admindata.password}
            onChange={(e) =>
              setadmindata({ ...admindata, password: e.target.value })
            }
            placeholder="Password"
            className="input input-primary input-bordered bg-white w-full max-w-xs focus:ring focus:ring-indigo-300"
          />
          <button
            type="submit"
            className="btn btn-primary btn-lg text-white font-semibold py-3 rounded-md shadow-lg hover:bg-blue-600 transition-all duration-300 ease-in-out focus:ring-4 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdministratorLogin;
