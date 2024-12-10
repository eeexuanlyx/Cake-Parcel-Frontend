import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAddressContact, refreshAccessToken } from "../api/api";
import { useQuery } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [userId, setUserId] = useState({});

  const { data: profile = {}, isLoading } = useQuery({
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
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        if (decodedToken && decodedToken.user) {
          setUser(decodedToken.user);
        } else {
          logout();
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        logout();
      }
    }
  }, []);

  useEffect(() => {
    let timerId;

    const setupTokenRefresh = () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const expiryTime = decodedToken.exp * 1000; // Convert to milliseconds
        const refreshTime = expiryTime - Date.now() - 60 * 1000; // Refresh 1 minute before expiry

        if (refreshTime > 0) {
          console.log("Setting up token refresh in:", refreshTime, "ms");
          timerId = setTimeout(async () => {
            console.log("Refreshing token now...");
            try {
              await refreshAccessToken();
            } catch (err) {
              console.error("Token refresh failed:", err);
              logout();
            }
          }, refreshTime);
        }
      }
    };

    // Only run setupTokenRefresh if user changes meaningfully
    if (user) {
      setupTokenRefresh();
    }

    return () => {
      console.log("Clearing token refresh timer");
      clearTimeout(timerId);
    };
  }, [user]); // Runs only when `user` changes

  useEffect(() => {
    console.log("User has changed:", user);
  }, [user]);

  const contextValue = React.useMemo(
    () => ({ user, setUser, logout, userId }),
    [user, userId]
  );

  return (
    <UserContext.Provider
      value={{ user, setUser, logout, userId, contextValue }}
    >
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
