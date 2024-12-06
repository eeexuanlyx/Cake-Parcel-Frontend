import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ProtectedRoute = ({ children, roleRequired }) => {
  const { user } = useUserContext();

  if (!user) return <Navigate to="/login" replace />;

  if (roleRequired && user.role !== roleRequired) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
