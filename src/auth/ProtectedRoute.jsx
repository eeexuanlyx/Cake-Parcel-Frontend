import React from "react";
import { Navigate } from "react-router-dom";
import useUserContext from "../context/useUserContext";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useUserContext();
  const token = localStorage.getItem("token");

  if (!user && token) {
    return <p>Loading...</p>;
  }

  if (!user) return <Navigate to="/login" replace />;

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
