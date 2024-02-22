import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/check-user", {
        username,
        password,
      });

      if (response.data.message === "Login successful") {
        const user = response.data.user;

        localStorage.setItem("user", JSON.stringify(user));

        navigate(`/home`);
      } else {
        setError("Username or password incorrect");
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        className="bg-white p-8 rounded shadow-lg w-96"
        onSubmit={handleSubmit}
      >
        <div className="text-2xl text-center mb-8">team.io</div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username..."
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password..."
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border rounded py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex items-center justify-center">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/3"
            type="button"
            onClick={handleSubmit}
          >
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;
