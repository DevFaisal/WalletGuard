import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import API from "../api";
import { useAuth } from "../context";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  if (user) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await API.post("/api/users/login", {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      window.location.reload("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="max-w-md mx-auto p-4 pt-6 pb-10 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-600 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 text-sm text-gray-600 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-gray-300"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
