import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie"; // Import js-cookie
import logo from "../assets/logo-1.png";

interface UserData {
  username: string;
  email: string;
  role: string;  // Added role field to UserData interface
}

function Header({ data }: { data: UserData | null }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev); // Improved state toggle
  };

  const handleLogout = async () => {
    try {
      const res = await axios.post("http://localhost:8082/users/logout", {}, { withCredentials: true });
      console.log(res.data);
      Cookies.remove();
      sessionStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Conditionally render Generate Password link based on user role
  const showGeneratePassword =
    data?.role && (
      ["admin", "moderator", "super admin"].includes(data.role.toLowerCase())
    );

  return (
    <header className="w-full bg-gray-800 p-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-8" />

      {/* Right Side: Home, Generate Password, Avatar */}
      <div className="flex items-center space-x-6">
        <button className="text-white hover:text-gray-300">Home</button>

        {/* Conditionally render the Generate Password, Register User, and List Users links */}
        {showGeneratePassword && (
          <>
            <Link to={"/generate-password"} className="text-white hover:text-gray-300">
              Generate Password
            </Link>
            <Link to={"/register-user"} className="text-white hover:text-gray-300">
              Register User
            </Link>
            <Link to={"/list-users"} className="text-white hover:text-gray-300">
              List Users
            </Link>
          </>
        )}

        {/* Avatar */}
        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center text-white cursor-pointer"
          >
            {/* Avatar Initial */}
            {data ? data.username.charAt(0).toUpperCase() : "U"}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg p-4">
              <div className="font-semibold">{data?.username}</div>
              <div className="text-sm text-gray-600">{data?.email}</div>
              <button
                onClick={handleLogout}
                className="mt-2 w-full bg-red-600 text-white py-2 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
