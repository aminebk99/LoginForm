import React, { useState } from 'react';
import axios from 'axios';

interface ResponseData {
  message: string;
}

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');
  const BASE_URL = process.env.REACT_APP_BASE_URL

  // Function to validate the email format
  const validateEmail = (): boolean => {
    if (!email) {
      setEmailError('Email is required');
      return false;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setEmailError('Invalid email format');
      return false;
    }
    setEmailError('');
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!validateEmail()) return;

    setLoading(true);

    try {
      const response = await axios.post<ResponseData>(`${BASE_URL}/forgot-password`, { email });
      console.log(BASE_URL);
      setToastMessage(response.data.message);  // Assuming the backend sends a message in `response.data.message`
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        // Handle axios error with a response (e.g., backend validation issues)
        setToastMessage(error.response.data.message || 'An error occurred, please try again.');
      } else {
        // Handle unexpected error
        setToastMessage('An error occurred, please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white px-10 py-20 shadow-sm rounded-3xl border-2 border-gray-100 w-3/4">
      <h1 className="lg:text-4xl md:text-3xl text-center text-2xl font-semibold">
        Forgot Password
      </h1>
      <p className="font-medium lg:text-sm text-center text-sm text-gray-400 mt-4">
        Please enter your email address to reset your password
      </p>

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded-md shadow-md">
          {toastMessage}
        </div>
      )}

      <div className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="email">
            Email:
          </label>
          <input
            required
            id="email"
            type="email"
            className={`w-full focus:outline-none border-2 rounded-xl p-4 mt-1 bg-transparent ${emailError ? 'border-red-500' : 'border-gray-100'}`}
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
        </div>
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            onClick={handleSubmit}
            className="active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold"
            disabled={loading}
          >
            {loading ? (
              <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ) : (
              'Forgot Password'
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
