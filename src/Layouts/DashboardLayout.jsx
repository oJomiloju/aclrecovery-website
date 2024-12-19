import React, { useState, useRef, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaHome, FaUser, FaUpload, FaChartLine, FaDumbbell, FaSignOutAlt } from "react-icons/fa";
import supabase from "../supabase"; // Import Supabase client

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for Sidebar
  const location = useLocation(); // Get the current route path
  const navigate = useNavigate();

  // Close Sidebar on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Logout Function
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      navigate("/login"); // Redirect to login after logout
    } catch (err) {
      console.error("Logout failed:", err.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row" style={{ backgroundColor: "#E3F2FD" }}>
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`w-64 space-y-6 py-7 px-4 absolute inset-y-0 left-0 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0 z-50 shadow-lg`}
        style={{
          backgroundColor: "#0D47A1",
          color: "white",
        }}
      >
        {/* Sidebar Header */}
        <div className="text-3xl font-bold text-center flex items-center justify-center">
          <span>Motion 90</span>
          <span className="align-super text-base">°</span>
        </div>

        {/* Navigation Links */}
        <nav className="mt-6 space-y-2">
          {[
            { path: "/dashboard", name: "Overview", icon: <FaHome /> },
            { path: "/dashboard/profile", name: "Profile", icon: <FaUser /> },
            { path: "/dashboard/upload", name: "Upload Reports", icon: <FaUpload /> },
            { path: "/dashboard/progress", name: "Progress", icon: <FaChartLine /> },
            { path: "/dashboard/exercises", name: "Exercises", icon: <FaDumbbell /> },
          ].map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center py-2.5 px-4 rounded transition-transform duration-200 ease-in-out ${
                location.pathname === link.path
                  ? "bg-[#E3F2FD] text-black font-bold scale-105" // Highlight active link
                  : "bg-transparent text-white hover:scale-105"
              }`}
              onClick={() => setIsSidebarOpen(false)}
            >
              <span className="mr-2">{link.icon}</span>
              {link.name}
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center py-2.5 px-4 rounded transition-transform duration-200 ease-in-out bg-transparent text-white hover:scale-105 w-full"
          >
            <FaSignOutAlt className="mr-2" />
            Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8">
        {/* Mobile Navbar */}
        <header
          className="shadow-md py-4 px-6 flex justify-between items-center md:hidden"
          style={{ backgroundColor: "#E3F2FD" }}
        >
          <button
            className="text-black focus:outline-none"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
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
          </button>
          <h1 className="text-xl font-bold" style={{ color: "black" }}>
            Dashboard
          </h1>
        </header>

        {/* Outlet */}
        <main
          className="p-6 shadow-lg bg-white"
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
