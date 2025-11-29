import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const userRole = localStorage.getItem("userRole");

  if (!userRole) {
    // Not logged in
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(userRole)) {
    // Logged in but wrong role
    return <Navigate to={`/${userRole}-dashboard`} replace />;
  }

  return children;
};

export default ProtectedRoute;
