// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute: allows access to children only when localStorage 'swell_auth_v1'
 * exists and contains a role included in allowedRoles.
 *
 * Props:
 *  - allowedRoles: array of strings, e.g. ["student","admin"]
 *  - children: component to render
 */
export default function ProtectedRoute({ allowedRoles = [], children }) {
  let auth = null;
  try {
    const raw = localStorage.getItem("swell_auth_v1");
    if (raw) auth = JSON.parse(raw);
  } catch (e) {
    auth = null;
  }

  if (!auth || !auth.role) {
    return <Navigate to="/" replace />;
  }

  if (Array.isArray(allowedRoles) && allowedRoles.length > 0) {
    if (!allowedRoles.includes(auth.role)) {
      return <Navigate to="/" replace />;
    }
  }

  return children;
}
