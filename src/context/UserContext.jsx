import React, { createContext, useContext, useState, useEffect } from "react";
import { getAddressContact } from "../api/api";
import { useQuery } from "@tanstack/react-query";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState({});

  const { data: profile = {}, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getAddressContact,
    enabled: !!user,
  });

  useEffect(() => {
    if (!isLoading && profile?.user_id) {
      setUserId(profile.user_id);
    }
  }, [isLoading, profile]);

  return (
    <UserContext.Provider value={{ user, setUser, userId }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
