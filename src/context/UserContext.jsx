import React, { createContext, useContext, useState } from "react";

const UserContext = createContext();

export const useUserContext = () => {
  return useContext(UserContext);
};

// UserContext provider to wrap the application and manage the user state
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  const login = (userData) => {
    setUser(userData); // Set user data
    setRole(userData.role); // Set user role (from userData)
  };

  const logout = () => {
    setUser(null); // Reset user
    setRole(null); // Reset role
  };

  return (
    <UserContext.Provider value={{ user, role, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
