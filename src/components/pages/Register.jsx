import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { registerUser } from "../../api/api";
import { useUserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import Login from "./LoginPage";

const Register = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
  });

  const { email, password, confirmPassword, name } = inputs;
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const [showLogin, setShowLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isFormValid =
    email.trim() !== "" &&
    name.trim() !== "" &&
    password.trim() !== "" &&
    password.trim() === confirmPassword.trim();

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const mutation = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setErrorMessage("");
      navigate("/");
    },
    onError: (error) => {
      setErrorMessage(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(inputs); // Pass the user inputs to the mutation
  };

  const handleToggle = () => {
    setShowLogin((prev) => !prev);
  };

  return (
    <>
      {!showLogin ? (
        <div className="container mx-auto px-4 py-8 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">Create Account</h2>
          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter your email"
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
                value={password}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Confirm your password"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                placeholder="Enter your full name"
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-4 py-2 px-4 font-bold rounded-md ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isFormValid || mutation.isLoading}
            >
              {mutation.isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>
          {errorMessage && (
            <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
          )}
          <p className="text-center mt-3">
            Already have an account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleToggle}
            >
              Login
            </span>
          </p>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};

export default Register;
