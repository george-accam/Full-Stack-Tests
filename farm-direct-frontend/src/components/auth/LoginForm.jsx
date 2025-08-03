// src/components/auth/LoginForm.jsx
import { useState } from "react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("customer");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Authentication logic
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-agri-green mb-6">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor="userType">
            I am a:
          </label>
          <select
            id="userType"
            className="w-full p-2 border rounded"
            value={userType}
            onChange={(e) => setUserType(e.target.value)}
          >
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>

        {/* Email and password fields */}
        <button
          type="submit"
          className="w-full bg-agri-green text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-agri-green">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
