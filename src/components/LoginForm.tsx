import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true); // To track if email is valid
  const [emailTouched, setEmailTouched] = useState(false); // To track if email field was touched

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const handleEmailBlur = () => {
    setEmailTouched(true); // Mark the email field as touched when the user leaves the field
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    setEmailValid(emailRegex.test(email));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="bg-white px-10 py-20 shadow-sm rounded-3xl border-2 border-gray-100 w-3/4">
      <h1 className="lg:text-4xl md:text-3xl text-center text-2xl font-semibold">Welcome Back</h1>
      <p className="font-medium lg:text-sm text-center text-sm text-gray-400 mt-4">
        Welcome back! Please enter your details.
      </p>
      <div className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="email">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur}
            className={`w-full focus:border-gray-400 outline-none border-2 rounded-xl p-4 mt-1 bg-transparent ${
              emailValid ? "border-gray-100" : "border-red-500"
            }`}
            placeholder="Enter your email"
          />
          {/* Validation message */}
          {!emailValid && emailTouched && (
            <p className="text-red-500 text-sm mt-2">Please enter a valid email address.</p>
          )}
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="password">
            Password:
          </label>
          <input
            className="w-full border-2 outline-none focus:border-gray-400 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            type="password"
            placeholder="Enter your password"
          />
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
          <button className="active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold">
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
