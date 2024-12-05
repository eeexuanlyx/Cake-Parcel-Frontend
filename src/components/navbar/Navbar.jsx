import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUserContext() || {};

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="font-bold text-indigo-900 drop-shadow-md text-4xl font-cookie"
        >
          Cake Parcel
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/about">About Us</Link>
          <Link to="/cart">Cart</Link>
          {user ? (
            <>
              {user.role === "admin" && <Link to="/admin">Admin Page</Link>}
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
      </div>
    </nav>
  );
};

export default Navbar;
