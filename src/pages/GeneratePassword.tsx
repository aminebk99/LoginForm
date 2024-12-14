import React, { useState, ChangeEvent, FormEvent } from "react";

const GeneratePassword: React.FC = () => {
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [startOption, setStartOption] = useState<"alphabet" | "number" | "special">("alphabet");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Handle the visibility of the password (show/hide)
  const handleShowHidePassword = (): void => setShowPassword(!showPassword);

  // Function to generate a random password
  const generateRandomPassword = (startOption: "alphabet" | "number" | "special"): string => {
    const length = 12;
    let password = "";

    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

    let possibleChars = alphabet + numbers + specialChars;

    // Add the first character based on the startOption
    if (startOption === "number") {
      password += numbers.charAt(Math.floor(Math.random() * numbers.length));
    } else if (startOption === "special") {
      password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));
    } else {
      password += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    // Generate the rest of the password
    for (let i = password.length; i < length; i++) {
      password += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }


    return password.split('').sort(() => Math.random() - 0.5).join('');
  };

  const handleGeneratePassword = (): void => {
    const generatedPassword = generateRandomPassword(startOption);
    setPassword(generatedPassword);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setError("This is a sample error message");
    }, 2000);
  };

  return (
    <div className="bg-white px-10 py-20 shadow-sm rounded-3xl border-2 border-gray-100 w-3/4">
      <h1 className="lg:text-4xl md:text-3xl text-center text-2xl font-semibold">Generate a Secure Password</h1>
      <p className="font-medium lg:text-sm text-center text-sm text-gray-400 mt-4">
        Choose the options below to generate a complex password.
      </p>
      <form onSubmit={handleSubmit} className="mt-8">
        <div className="flex items-center justify-between">
          <label className="text-lg font-medium" htmlFor="password-start">
            Start With:
          </label>
          <select
            id="password-start"
            value={startOption}
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setStartOption(e.target.value as "alphabet" | "number" | "special")}
            className="border-2 p-2 rounded-xl"
          >
            <option value="alphabet">Alphabet</option>
            <option value="number">Number</option>
            <option value="special">Special Character</option>
          </select>
        </div>
        
        <div className="mt-4">
          <label className="text-lg font-medium" htmlFor="password">
            Generated Password:
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              readOnly
              className="w-full border-2 outline-none focus:border-gray-400 rounded-xl p-4 mt-1 bg-transparent"
              placeholder="Generated Password"
            />
            <button
              type="button"
              onClick={handleShowHidePassword}
              className="absolute right-3 top-3"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleGeneratePassword}
            className="py-3 rounded-xl bg-blue-800 text-white text-lg font-bold"
          >
            Generate Password
          </button>
        </div>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center mt-4">{error}</p>}

        {/* Form Submit Button (for demonstration purposes) */}
        <div className="mt-8 flex flex-col gap-y-4">
          <button
            type="submit"
            className="active:scale-[.99] active:duration-75 transition-all py-3 rounded-xl bg-blue-800 text-white text-lg font-bold"
            disabled={loading}
          >
            {loading ? (
              <div className="w-6 h-6 border-4 border-t-4 border-blue-800 rounded-full animate-spin"></div>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneratePassword;
