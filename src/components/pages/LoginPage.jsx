import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/api";
import { useUserContext } from "../../context/UserContext";
import Register from "./Register";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const { setUser } = useUserContext();
  const navigate = useNavigate();
  const isFormValid = email.trim() !== "" && password.trim() !== "";

  const {
    mutate: loginMutation,
    isLoading,
    error,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role, // Store user role
      });
      console.log(data.user.role);
      setErrorMessage("");
      navigate("/");
    },
    onError: (error) => {
      setErrorMessage("Login failed:", error.message);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!isFormValid) {
      console.error("Please fill in all required fields.");
      return;
    }

    loginMutation({ email, password }); // Call the login mutation
  };

  const handleToggle = () => {
    setShowRegister((prev) => !prev); // Toggle between login and register
  };

  return (
    <>
      {!showRegister ? (
        <div className="container max-w-screen-lg mx-auto px-4 py-8 min-h-screen">
          <h2 className="text-2xl font-bold mb-6">Login</h2>
          <form
            className="bg-white shadow-md rounded-lg px-4 py-8 max-w-sm mx-auto mt-11"
            onSubmit={handleLogin}
          >
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
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500"
              />
            </div>

            <button
              type="submit"
              className={`w-full mt-4 py-2 px-4 font-bold rounded-md ${
                isFormValid
                  ? "bg-blue-500 hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
              disabled={!isFormValid || isLoading} // Disable button if form is invalid or loading
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error.message}</p>
          )}
          <p className="text-center mt-3">
            No account?{" "}
            <span
              className="text-blue-500 cursor-pointer"
              onClick={handleToggle}
            >
              Create one
            </span>
          </p>
        </div>
      ) : (
        <Register />
      )}
    </>
  );
};

export default Login;
