import { Navigate, useLocation } from "react-router-dom";

function getStoredRole() {
  try {
    const data = JSON.parse(localStorage.getItem("auth") || "null");
    return data?.role ?? null;
  } catch {
    return null;
  }
}

/**
 * Usage:
 * <ProtectedRoute allowRole="student"><StudentDashboard/></ProtectedRoute>
 */
export default function ProtectedRoute({ allowRole, children }) {
  const location = useLocation();
  const role = getStoredRole();

  if (!role) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (allowRole && role !== allowRole) {
    // Role mismatch: send them to their own dashboard if possible
    const fallback = role === "admin" ? "/admin" : "/student";
    return <Navigate to={fallback} replace />;
  }

  return children;
}
