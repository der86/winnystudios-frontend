import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_BASE_URL;

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.json();
        throw new Error(msg.error || msg.message || "Invalid credentials");
      }

      const data = await res.json();
      login(data.user, data.token); // ✅ pass both user and token

      if (data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full p-2 border rounded mb-2"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          required
        />

        <button className="w-full bg-[#ff3f8e] text-white py-2 rounded-lg font-semibold hover:bg-[#e23275] transition">
          Login
        </button>

        <p className="text-sm text-gray-600 mt-4 text-center">
          Don’t have an account?{" "}
          <Link to="/register" className="text-[#ff3f8e] hover:underline">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
}
