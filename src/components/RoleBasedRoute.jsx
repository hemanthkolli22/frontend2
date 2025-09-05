import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function RoleBasedRoute({ allowedRoles, children }) {
  const { token, user } = useSelector((state) => state.auth);

  // 🔹 If not logged in
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  // 🔹 If role is not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // ✅ Allowed
  return children;
}
