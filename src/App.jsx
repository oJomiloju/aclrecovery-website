import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainLayout from "./Layouts/MainLayout";
import DashboardLayout from "./Layouts/DashboardLayout";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile"; // Add your Profile page
import UploadReports from "./pages/UploadReports"; // Add Upload Reports page
import Progress from "./pages/Progress"; // Add Progress page
import Exercises from "./pages/Exercises"; // Add Exercises page
import SetupProfile from "./pages/setup-profile";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* Public Routes */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="setup-profile" element={<SetupProfile />} />
        </Route>

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} /> {/* Overview page */}
          <Route path="profile" element={<Profile />} /> {/* Profile */}
          <Route path="upload" element={<UploadReports />} /> {/* Upload Reports */}
          <Route path="progress" element={<Progress />} /> {/* Progress */}
          <Route path="exercises" element={<Exercises />} /> {/* Exercises */}
        </Route>
      </>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
