import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import { useState, useRef, useEffect } from "react";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const userInfo = useSelector((state) => state.auth.user);
  const role = useSelector((state) => state.auth.role) || userInfo?.role;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
    setMenuOpen(false);
    setProfileOpen(false);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const linkClass = (path) =>
    `${location.pathname === path ? "text-yellow-400 font-semibold" : "text-white"} hover:text-yellow-300 transition-colors duration-200`;

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-white font-bold text-3xl tracking-wide hover:text-yellow-400 transition duration-200"
          >
            JobFinder
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={linkClass("/")}>Home</Link>
            <Link to="/jobs" className={linkClass("/jobs")}>Jobs</Link>
            <Link to="/aboutus" className={linkClass("/aboutus")}>About Us</Link>
            <Link to="/services" className={linkClass("/services")}>Services</Link>
            <Link to="/contact" className={linkClass("/contact")}>Contact</Link>

            {/* Role-specific links */}
            {role === "jobseeker" && <Link to="/my-applications" className={linkClass("/my-applications")}>My Applications</Link>}
            {role === "recruiter" && (
              <>
                <Link to="/jobs/create" className={linkClass("/jobs/create")}>Post Job</Link>
                <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
              </>
            )}
            {role === "admin" && (
              <>
                <Link to="/manage-users" className={linkClass("/manage-users")}>Manage Users</Link>
                <Link to="/manage-jobs" className={linkClass("/manage-jobs")}>Manage Jobs</Link>
                <Link to="/dashboard" className={linkClass("/dashboard")}>Dashboard</Link>
              </>
            )}

            {/* Auth Section */}
            {!userInfo ? (
              <>
                <Link
                  to="/login"
                  className="ml-2 px-4 py-2 bg-yellow-400 text-gray-900 font-semibold rounded-lg shadow hover:bg-yellow-500 hover:text-white transition duration-300"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="ml-2 px-4 py-2 bg-green-500 text-white font-semibold rounded-lg shadow hover:bg-green-600 transition duration-300"
                >
                  Register
                </Link>
              </>
            ) : (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center focus:outline-none hover:opacity-90 transition"
                >
                  <img
                    src="https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png"
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-white shadow-md"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white text-gray-800 rounded-xl shadow-xl overflow-hidden border border-gray-200">
                    <Link to="/profile" onClick={closeMenu} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100">
                      <User size={16}/> My Profile
                    </Link>
                    {role === "jobseeker" && <Link to="/my-applications" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100">My Applications</Link>}
                    {role === "recruiter" && <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"><LayoutDashboard size={16}/> Dashboard</Link>}
                    {role === "admin" && <Link to="/dashboard" onClick={closeMenu} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100"><LayoutDashboard size={16}/> Dashboard</Link>}
                    <button onClick={handleLogout} className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100">
                      <LogOut size={16}/> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-white focus:outline-none">
              {menuOpen ? <X size={26}/> : <Menu size={26}/> }
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pt-3 pb-4 space-y-2 bg-blue-700 shadow-md rounded-b-lg border-t border-blue-600">
          <Link to="/" onClick={closeMenu} className={linkClass("/")}>Home</Link>
          <Link to="/jobs" onClick={closeMenu} className={linkClass("/jobs")}>Jobs</Link>

          {role === "jobseeker" && <Link to="/my-applications" onClick={closeMenu} className={linkClass("/my-applications")}>My Applications</Link>}
          {role === "recruiter" && <>
            <Link to="/jobs/create" onClick={closeMenu} className={linkClass("/jobs/create")}>Post Job</Link>
            <Link to="/dashboard" onClick={closeMenu} className={linkClass("/dashboard")}>Dashboard</Link>
          </>}
          {role === "admin" && <>
            <Link to="/manage-users" onClick={closeMenu} className={linkClass("/manage-users")}>Manage Users</Link>
            <Link to="/manage-jobs" onClick={closeMenu} className={linkClass("/manage-jobs")}>Manage Jobs</Link>
            <Link to="/dashboard" onClick={closeMenu} className={linkClass("/dashboard")}>Dashboard</Link>
          </>}

          {!userInfo ? (
            <>
              <Link to="/login" onClick={closeMenu} className="block px-4 py-2 bg-yellow-400 text-gray-900 rounded-lg shadow hover:bg-yellow-500 hover:text-white transition duration-300">Login</Link>
              <Link to="/register" onClick={closeMenu} className="block px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 transition duration-300">Register</Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={closeMenu} className="block px-4 py-2 text-white hover:text-yellow-300">My Profile</Link>
              <Link to="/dashboard" onClick={closeMenu} className="block px-4 py-2 text-white hover:text-yellow-300">Dashboard</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition duration-300">Logout</button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
