import { useUserContext } from "../../context/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { refreshAccessToken } from "../../api/api";
import { useEffect } from "react";

const TokenRefreshHandler = () => {
  const { user, setUser } = useUserContext();
  const location = useLocation();
  const navigate = useNavigate();

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
        const decodedToken = jwtDecode(token);
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
          timerId = setTimeout(async () => {
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

    if (user) {
      setupTokenRefresh();
    }

    return () => {
      clearTimeout(timerId);
    };
  }, [user, location]);

  return null;
};

export default TokenRefreshHandler;
