import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import logo from "../assets/logo-1.png";

interface UserData {
  username: string;
  email: string;
  role?: string;  // Role is now optional
}

interface HeaderProps {
  data: UserData | null;
}

function Header({ data }: HeaderProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(prev => !prev);
  };

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:8082/users/logout", {}, { withCredentials: true });
      Cookies.remove("JSESSIONID");
      sessionStorage.removeItem("userData");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const showGeneratePassword = useMemo(() => {
    return data?.role && ["admin", "moderator", "super admin"].includes(data.role.toLowerCase());
  }, [data]);

  return (
    <header className="w-full bg-gray-800 p-4 flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-8" />

      <div className="flex items-center space-x-6">
        <button className="text-white hover:text-gray-300">Home</button>

        {showGeneratePassword && (
          <>
            <Link to="/generate-password" className="text-white hover:text-gray-300">
              Generate Password
            </Link>
            <Link to="/register-user" className="text-white hover:text-gray-300">
              Register User
            </Link>
            <Link to="/list-users" className="text-white hover:text-gray-300">
              List Users
            </Link>
          </>
        )}

        <div className="relative">
          <div
            onClick={toggleDropdown}
            className="w-10 h-10 rounded-full bg-blue-600 flex justify-center items-center text-white cursor-pointer"
          >
            {data ? data.username.charAt(0).toUpperCase() : "U"}
          </div>

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
