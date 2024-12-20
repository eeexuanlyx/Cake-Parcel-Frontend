import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserContext from "../../context/useUserContext";

const Navbar = () => {
  const { user, setUser } = useUserContext() || {};
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    setUser(null);
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-indigo-900 drop-shadow-md text-4xl font-cookie"
        >
          Cake Parcel
        </Link>
        {/* Hamburger Menu for Small Screens */}

        <button
          className="md:hidden text-indigo-900 text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/about" className="text-gray-800 hover:text-indigo-700">
            About Us
          </Link>
          <Link to="/request" className="text-gray-800 hover:text-indigo-700">
            Request A Cake
          </Link>

          {user ? (
            <>
              {user.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-gray-800 hover:text-indigo-700"
                >
                  Admin Panel
                </Link>
              )}
              <Link to="/cart" className="text-gray-800 hover:text-indigo-700">
                Cart
              </Link>
              <Link
                to="/orders"
                className="text-gray-800 hover:text-indigo-700"
              >
                My Orders
              </Link>
              <Link
                to="/profile"
                className="text-gray-800 hover:text-indigo-700"
              >
                Profile
              </Link>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-blue-700 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Login
            </Link>
          )}
        </div>

        {/* Dropdown Menu for Small Screens */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4 md:hidden z-50">
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About Us
            </Link>
            <Link to="/request" onClick={() => setMenuOpen(false)}>
              Request A Cake
            </Link>

            {user ? (
              <>
                {user.role === "admin" && (
                  <Link to="/admin" onClick={() => setMenuOpen(false)}>
                    Admin Page
                  </Link>
                )}
                <Link to="/cart" onClick={() => setMenuOpen(false)}>
                  Cart
                </Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)}>
                  My Orders
                </Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)}>
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                  }}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
