import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
//import { useUserContext } from "../../context/UserContext";
import Register from "./Register";

const LoginPage = () => {
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");
  //const { login } = useUserContext();
  //const navigate = useNavigate();

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     // Simulate a successful login
  //     const userData = { email, role: "user" }; // Mock user data, set role here
  //     login(userData); // Set the user in context with the role
  //     navigate("/"); // Redirect to home after login
  //   };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none focus:ring-blue-200"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="underline text-sm text-blue-500 hover:text-blue-700"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md"
          >
            Login
          </button>
        </form>
        <Register />
      </div>
    </>
  );
};

export default LoginPage;
