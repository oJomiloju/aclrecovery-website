import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../supabase";

const SignupPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Handle input changes for regular signup
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Regular Email/Password Sign-Up
  const handleRegularSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Sign up the user with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: { full_name: formData.name }, // Pass name as metadata
        },
      });

      if (authError) throw new Error(authError.message);

      const user = authData.user;
      if (!user) throw new Error("Failed to create user.");

      // Navigate to the login page after successful sign-up
      navigate("/login");
    } catch (err) {
      setError(err.message);
      console.error("Sign-Up Error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Sign-Up
  const handleGoogleSignUp = async () => {
    setError("");
    setLoading(true);

    try {
      // Trigger Google Sign-Up
      const { error: authError } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/dashboard`, // Redirect user after login
        },
      });

      if (authError) throw new Error(authError.message);
    } catch (err) {
      setError(err.message);
      console.error("Google Sign-Up Error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-white flex flex-col lg:flex-row items-center justify-center">
      {/* Left Section */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-lg">
          <h1 className="text-6xl font-serif font-bold text-black leading-tight mb-6">
            Empowering ACL <br /> Recovery Through Motion
          </h1>
          <p className="text-lg text-gray-700">
            Take the first step in your recovery journey with Motion 90°. From
            personalized exercises to progress tracking, we’re here to help you
            rebuild strength and confidence.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-24 lg:py-16 bg-white">
        <h2 className="text-4xl font-bold text-[#0D47A1] mb-8 text-center lg:text-left">
          Create an Account
        </h2>

        {/* Error Message */}
        {error && (
          <p className="text-red-600 bg-red-100 p-2 rounded-md mb-4">
            {error}
          </p>
        )}

        {/* Sign-Up Form */}
        <form
          onSubmit={handleRegularSignUp}
          className="space-y-6 max-w-md w-full mx-auto lg:mx-0"
        >
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0D47A1]"
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
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
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
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
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center justify-center my-8">
          <hr className="w-1/3 border-gray-300" />
          <span className="mx-4 text-gray-600">OR</span>
          <hr className="w-1/3 border-gray-300" />
        </div>

        {/* Google Sign-Up */}
        <button
          onClick={handleGoogleSignUp}
          disabled={loading}
          className={`w-full bg-white text-[#0D47A1] border border-gray-300 font-bold py-3 rounded-md hover:bg-gray-100 transition duration-300 flex items-center justify-center ${
            loading ? "opacity-50" : ""
          }`}
        >
          <img
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
            alt="Google"
            className="w-5 h-5 mr-3"
          />
          Sign Up with Google
        </button>
      </div>
    </div>
  );
};

export default SignupPage;
