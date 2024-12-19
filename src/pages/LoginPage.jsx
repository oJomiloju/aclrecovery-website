import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Regular Login with Email and Password
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Log in user
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw new Error(authError.message);

      // Redirect to dashboard after login
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Google Login
  const handleGoogleLogin = async () => {
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`, // Redirect after successful login
        },
      });

      if (authError) throw new Error(authError.message);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-white px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">Log In</h2>
        {error && <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${
              loading ? "bg-gray-400" : "bg-[#0D47A1]"
            } text-white font-bold py-3 rounded-md hover:bg-[#002F6C] transition duration-300`}
          >
            {loading ? "Logging In..." : "Log In"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-6">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-4 text-gray-600">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full bg-white text-[#0D47A1] border border-gray-300 font-bold py-3 rounded-md hover:bg-gray-100 transition duration-300 flex items-center justify-center"
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-3"
          />
          {loading ? "Signing In..." : "Log In with Google"}
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
