import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa'; 

function ResetPasswordForm() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if the passwords match
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Clear error if passwords match
    setError(null);

    // Handle form submission logic here (e.g., API call)
    console.log("Form submitted:", newPassword);
  };

  return (
    <div className="bg-white px-10 py-20 shadow-sm rounded-3xl border-2 border-gray-100 w-3/4">
      <h1 className="lg:text-4xl md:text-3xl text-center text-2xl font-semibold">
        Reset your password
      </h1>
      <p className="font-medium lg:text-sm text-center text-sm text-gray-400 mt-4">
        Welcome back! Please enter your details.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div>
          <label className="text-lg font-medium" htmlFor="new-password">
            New password
          </label>
          <input
            type={showPassword ? 'text' : 'password'}
            id="new-password"
            name="new-password"
            className="w-full focus:border-gray-400 outline-none border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            
          />
          
        </div>
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="confirm-password">
            Confirm your password
          </label>
          <input
            type="password"
            id="confirm-password"
            name="confirm-password"
            className="w-full border-2 outline-none focus:border-gray-400 border-gray-100 rounded-xl p-4 mt-1 bg-transparent"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold"
          >
            Reset password
          </button>
        </div>
      </form>
    </div>
  );
}

export default ResetPasswordForm;
