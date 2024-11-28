import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm() {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // Change 'email' to 'username'
  const [password, setPassword] = useState("");
  const [usernameValid, setUsernameValid] = useState(true); // Track username validity
  const [usernameTouched, setUsernameTouched] = useState(false); // Track if the username field was touched
  const [passwordValid, setPasswordValid] = useState(true); // Track password validity
  const [loading, setLoading] = useState(false); // Track loading state
  const [error, setError] = useState(""); // Track errors from login attempt

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); 
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password.length < 6) {
      setPasswordValid(false);
      setLoading(false);
      return;
    }

    const loginData = {
      username: username, 
      password: password,
    };

    try {
      await axios.post("http://localhost:8082/users/login", loginData, {
        headers: {
          "Content-Type": "application/json", 
        },
        withCredentials: true, 
      });
      console.log(loginData);
      
      navigate("/dashboard");
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-10 py-20 shadow-sm rounded-3xl border-2 border-gray-100 w-3/4">
      <h1 className="lg:text-4xl md:text-3xl text-center text-2xl font-semibold">Welcome Back</h1>
      <p className="font-medium lg:text-sm text-center text-sm text-gray-400 mt-4">
        Welcome back! Please enter your details.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="username">
            Username:
          </label>
          <input
            type="text"
            id="username" 
            value={username} 
            onChange={handleUsernameChange} 
            className={`w-full focus:border-gray-400 outline-none border-2 rounded-xl p-4 mt-1 bg-transparent ${usernameValid ? "border-gray-100" : "border-red-500"}`}
            placeholder="Enter your username" 
          />
          {!usernameValid && usernameTouched && (
            <p className="text-red-500 text-sm mt-2">Please enter a valid username.</p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="password">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            className={`w-full border-2 outline-none focus:border-gray-400 ${passwordValid ? "border-gray-100" : "border-red-500"} rounded-xl p-4 mt-1 bg-transparent`}
            placeholder="Enter your password"
          />
          {!passwordValid && password.length === 0 && (
            <p className="text-red-500 text-sm mt-2">Password is required.</p>
          )}
        </div>
        <div className="mt-8 flex justify-end items-center">
          <Link to={'/forgot-password'}
            className="font-medium text-base text-blue-800"
          >
            Forgot password
          </Link>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-blue-800 rounded-full animate-spin"></div>
            ) : (
              "Sign in"
            )}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
