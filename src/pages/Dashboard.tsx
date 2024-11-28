import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";

interface UserData {
  username: string;
  email: string;
}

function Dashboard() {
  const [data, setData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // Function to fetch user data
  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:8082/users/data", {
        withCredentials: true,
      });

      // If data exists, set it and continue
      if (res.data && res.data.username && res.data.email) {
        setData(res.data);
        // Save to session storage (not recommended for sensitive data, consider using a secure store)
        sessionStorage.setItem("userData", JSON.stringify(res.data));
      } else {
        // Remove session storage and cookies
        Cookies.remove("yourCookieName", { path: '/' }); // Adjust path if necessary
        sessionStorage.removeItem("userData");
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      // Remove any stored session or cookies if the request fails
      Cookies.remove("yourCookieName", { path: '/' }); // Adjust path if necessary
      sessionStorage.removeItem("userData");
      navigate("/login");
    }
  };

  useEffect(() => {
    // Check if data exists in sessionStorage
    const storedData = sessionStorage.getItem("userData");

    if (storedData) {
      const parsedData: UserData = JSON.parse(storedData);
      setData(parsedData);  // Load from session storage if exists
    } else {
      // If not in session storage, fetch fresh data
      fetchData();
    }
  }, [navigate]);

  useEffect(() => {
    if (data) {
      // Save data to sessionStorage to persist after page refresh
      sessionStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header data={data} />

      {/* Main Content */}
      <div className="w-full h-full flex justify-center items-center flex-col">
        <h2 className="text-3xl">
          {data ? (
            `Welcome ${data.username}`
          ) : (
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          )}
        </h2>
        <span>{data?.email}</span>
      </div>
    </div>
  );
}

export default Dashboard;
