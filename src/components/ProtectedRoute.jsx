import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ roles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Loading...</div>; // You can replace this with a loading spinner
  }

  if (!user) {
    // Not logged in, redirect to login page
    return <Navigate to="/login" />;
  }

  if (roles && !roles.includes(user.role)) {
    // User role not authorized, redirect to unauthorized page
    return <Navigate to="/unauthorized" />;
  }

  // User is authorized, render the matched child route
  return <Outlet />;
};

export default ProtectedRoute;

