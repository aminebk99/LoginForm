import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Header from "../components/Header";

interface UserData {
  username: string;
  email: string;
  role?: string;
}

function Dashboard() {
  const [data, setData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  // Clear session storage and cookies
  const clearSessionAndCookies = () => {
    Cookies.remove("yourCookieName", { path: '/' });
    sessionStorage.removeItem("userData");
  };

  // Fetch user data from the server
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:8082/users/data", {
        withCredentials: true,
      });

      if (res.data?.username && res.data?.email) {
        setData(res.data);
        sessionStorage.setItem("userData", JSON.stringify(res.data));
      } else {
        clearSessionAndCookies();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      clearSessionAndCookies();
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const storedData = sessionStorage.getItem("userData");

    if (storedData) {
      const parsedData: UserData = JSON.parse(storedData);
      setData(parsedData);
    } else {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (data) {
      sessionStorage.setItem("userData", JSON.stringify(data));
    }
  }, [data]);

  return (
    <div className="w-full h-screen flex flex-col">
      <Header data={data} />

      <div className="w-full h-full flex justify-center items-center flex-col">
        <h2 className="text-3xl">
          {data ? `Welcome ${data.username}` : (
            <div className="w-16 h-16 border-4 border-t-4 border-blue-500 rounded-full animate-spin"></div>
          )}
        </h2>
        <span>{data?.email}</span>
      </div>
    </div>
  );
}

export default Dashboard;
