import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUserContext() || {};
  const [menuOpen, setMenuOpen] = useState(false);

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
          <Link to="/about">About Us</Link>

          {user ? (
            <>
              {user.role === "admin" && <Link to="/admin">Admin Page</Link>}
              <Link to="/cart">Cart</Link>
              <Link to="/orders">My Orders</Link>
              <Link to="/profile">Profile</Link>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>

        {/* Dropdown Menu for Small Screens */}
        {menuOpen && (
          <div className="absolute top-16 right-4 bg-white shadow-md rounded-lg p-4 flex flex-col space-y-4 md:hidden z-50">
            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About Us
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
