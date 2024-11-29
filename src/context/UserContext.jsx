import React, { createContext, useContext, useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import apiInstance from "../api/api"; // Import axios instance
import { useNavigate } from "react-router-dom";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  // const [role, setRole] = useState(null);

  // Function to fetch current user (e.g., via a `/me` endpoint)
  // const fetchCurrentUser = async () => {
  //   const { data } = await apiInstance.get("/auth/me");
  //   return data;
  // };

  // Use TanStack Query to fetch user data on app load or re-login
  // const {
  //   data: currentUser,
  //   isLoading: isUserLoading,
  //   refetch,
  // } = useQuery({
  //   queryKey: ["currentUser"],
  //   queryFn: fetchCurrentUser,
  //   enabled: false, // Disable auto-fetch, call manually after login
  //   onSuccess: (data) => {
  //     setUser(data.user);
  //     setRole(data.role); // Set role from fetched user data
  //   },
  // });

  //Login function using TanStack Mutation
  // const loginMutation = useMutation({
  //   mutationFn: async (loginData) => {
  //     const { data } = await apiInstance.post("/auth/login", loginData);
  //     return data;
  //   },
  //   onSuccess: (data) => {
  //     localStorage.setItem("token", data.token); // Store token
  //     refetch(); // Fetch the current user after successful login
  //   },
  // });

  const logout = () => {
    localStorage.removeItem("token"); // Clear token
    setUser(null);
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        // role,
        setUser,
        // login: loginMutation.mutate,
        logout,
        // isLoading: isUserLoading || loginMutation.isLoading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
