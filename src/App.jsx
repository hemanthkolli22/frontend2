import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Pages
import HomePage from "./pages/HomePage";
import AboutUs from "./pages/AboutUs";
import Services from "./pages/Services";
import ContactUs from "./pages/ContactUs";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import JobListPage from "./pages/JobListPage";
import JobDetailsPage from "./pages/JobDetailsPage";
import ApplicationForm from "./pages/ApplicationForm";
import MyApplicationsPage from "./pages/MyApplicationsPage";
import BookmarksPage from "./pages/BookmarksPage";
import JobFormPage from "./pages/JobFormPage";
import AdminApplications from "./pages/AdminApplications";
import ManageUsers from "./pages/admin/ManageUsers";
import ManageJobs from "./pages/admin/ManageJobs";
import ProfilePage from "./pages/Profile";
import Dashboard from "./pages/Dashboard"; // ✅ unified dashboard

// Auth guards
import ProtectedRoute from "./components/ProtectedRoute";
import RoleBasedRoute from "./components/RoleBasedRoute";

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main Content */}
      <div className="flex-1">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/jobs" element={<JobListPage />} />
          <Route path="/jobs/:id" element={<JobDetailsPage />} />

          {/* Protected User Routes */}
          <Route
            path="/application-form"
            element={
              <ProtectedRoute>
                <ApplicationForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-applications"
            element={
              <ProtectedRoute>
                <MyApplicationsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/bookmarks"
            element={
              <ProtectedRoute>
                <BookmarksPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />

          {/* ✅ Unified Dashboard (Seeker + Recruiter + Admin) */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Recruiter/Admin Job Management */}
          <Route
            path="/jobs/create"
            element={
              <RoleBasedRoute allowedRoles={["recruiter", "admin"]}>
                <JobFormPage />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/jobs/edit/:id"
            element={
              <RoleBasedRoute allowedRoles={["recruiter", "admin"]}>
                <JobFormPage />
              </RoleBasedRoute>
            }
          />

          {/* Admin Only */}
          <Route
            path="/admin/applications"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <AdminApplications />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/manage-users"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageUsers />
              </RoleBasedRoute>
            }
          />
          <Route
            path="/manage-jobs"
            element={
              <RoleBasedRoute allowedRoles={["admin"]}>
                <ManageJobs />
              </RoleBasedRoute>
            }
          />

          {/* Fallback */}
          <Route
            path="*"
            element={<div className="p-8 text-center">404 - Page Not Found</div>}
          />
        </Routes>
      </div>

      <Footer />

      {/* Toast Notifications */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}
