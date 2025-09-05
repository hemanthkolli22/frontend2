import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { token, isLoggedin } = useSelector((state) => state.auth);

  if (!token || !isLoggedin) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
