import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Base_Url from "../Constant";
import { removeUser } from "../Utils/UserSilce";
import { removeConnections } from "../Utils/Connections";
import { removeRequestFull } from "../Utils/InvitationSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((store) => store.user);
  const isAuthenticated = Object.keys(user || {}).length > 0;
  const [isLoggingOut, setIsLoggingOut] = useState(false); // 🔄

  const logout = async () => {
    setIsLoggingOut(true);
    try {
      await axios.post(`${Base_Url}/logout`, {}, { withCredentials: true });
      dispatch(removeUser());
      dispatch(removeConnections());
      dispatch(removeRequestFull());
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err.message);
    } finally {
      setIsLoggingOut(false);
    }
  };

  const navItems = [
    { label: "Feed", path: "/user/feed" },
    { label: "Connections", path: "/user/connections" },
    { label: "Invitations", path: "/invitations" },
    { label: "Profile", path: "/update/profile" },
  ];

  if (isLoggingOut) {
    return (
      <div className="fixed inset-0 bg-gray-900 text-white flex items-center justify-center z-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-dashed rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-semibold animate-pulse">
            Logging you out...
          </p>
        </div>
      </div>
    );
  }

  return (
    <nav className="fixed w-full z-50 bg-gray-900 shadow py-2 transition-all">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <Link
          to={isAuthenticated ? "/user/feed" : "/"}
          className="flex items-center text-white text-2xl font-bold"
        >
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
            C
          </div>
          <span>Connectify</span>
        </Link>

        {/* Nav Items */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              {navItems.map(({ label, path }) => (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-2 rounded-lg ${
                    location.pathname === path
                      ? "bg-gray-800 text-blue-400"
                      : "text-gray-300 hover:bg-gray-800"
                  } transition`}
                >
                  {label}
                </Link>
              ))}
              <div className="flex items-center space-x-3 ml-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
                <button
                  onClick={logout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className={`px-4 py-2 rounded-lg ${
                location.pathname === "/login"
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              } transition`}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
