import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAddressContact } from "../api/api";
import { useQuery } from "@tanstack/react-query";
const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState({});

  const {
    data: profile = {},
    isError: fetchError,
    isLoading: isFetching,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getAddressContact,
    enabled: !!user,
  });

  useEffect(() => {
    if (profile?.user_id) {
      setUserId(profile.user_id);
    }
  }, [profile]);

  const logout = () => {
    localStorage.removeItem("token"); // Clear token
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const user = JSON.parse(atob(token.split(".")[1]));
        setUser(user);
      } catch (err) {
        console.error("Invalid token:", err);
        logout();
      }
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        logout,
        userId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
