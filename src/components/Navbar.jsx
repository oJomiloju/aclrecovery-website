import React, { useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-blue-100 to-white px-6 py-4 flex justify-between items-center">
      {/* App Name */}
      <div className="text-3xl font-serif font-bold">
        <Link to="/">Motion 90<span className="align-super text-base">°</span></Link>
      </div>

      {/* Desktop Links */}
      <div className="hidden md:flex space-x-6 items-center">
        <Link to="/login" className="text-lg hover:underline">
          Login
        </Link>
        <Link
          to="/signup"
          className="px-4 py-2 border border-black rounded-full text-lg hover:bg-black hover:text-white transition duration-300"
        >
          Sign Up
        </Link>
      </div>

      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="focus:outline-none"
        >
          {!isOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <line x1="6" y1="6" x2="18" y2="18" />
              <line x1="18" y1="6" x2="6" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-gradient-to-r from-blue-100 to-white flex flex-col items-center justify-center z-50 transition-transform duration-300 ${
          isOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <line x1="6" y1="6" x2="18" y2="18" />
            <line x1="18" y1="6" x2="6" y2="18" />
          </svg>
        </button>
        <Link
          to="/login"
          onClick={() => setIsOpen(false)}
          className="text-2xl font-bold mb-6 hover:underline"
        >
          Login
        </Link>
        <Link
          to="/signup"
          onClick={() => setIsOpen(false)}
          className="px-6 py-3 border border-black rounded-full text-lg hover:bg-black hover:text-white transition duration-300"
        >
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
