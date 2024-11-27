import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value); // Handle username input change
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value); // Handle password input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(""); // Reset error state

    // Simple validation for password length
    if (password.length < 6) {
      setPasswordValid(false);
      setLoading(false);
      return;
    }

    // Create a JSON object
    const loginData = {
      username: username, // Send 'username' as a string
      password: password, // Send 'password' as a string
    };

    // Perform login request with JSON payload
    try {
      await axios.post("http://localhost:8082/users/login", loginData, {
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
        withCredentials: true, // Include credentials with the request
      });
      console.log(loginData);
      // Optionally, navigate to a protected page after successful login
      navigate("/dashboard"); // Example redirect after successful login
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
            id="username" // Updated 'email' to 'username'
            value={username} // Bind username state
            onChange={handleUsernameChange} // Handle username change
            className={`w-full focus:border-gray-400 outline-none border-2 rounded-xl p-4 mt-1 bg-transparent ${usernameValid ? "border-gray-100" : "border-red-500"}`}
            placeholder="Enter your username" // Update placeholder text
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
          <button
            className="font-medium text-base text-blue-800"
            onClick={handleForgotPassword}
          >
            Forgot password
          </button>
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
