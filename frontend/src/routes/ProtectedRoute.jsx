import { Navigate } from "react-router-dom";

import { useAuthStore } from "../store/authStore";

const ProtectedRoute = ({ children, role }) => {
  const { authUser, checkingAuth } = useAuthStore();

  if (checkingAuth) {
    return (
      <div className="h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  if (role && authUser.role !== role) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
