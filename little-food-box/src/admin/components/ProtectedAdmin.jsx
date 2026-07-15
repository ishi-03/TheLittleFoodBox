import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedAdmin() {
  const token = localStorage.getItem("token");

  const user = JSON.parse(localStorage.getItem("user"));

  console.log("TOKEN:", token);
  console.log("USER:", user);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}