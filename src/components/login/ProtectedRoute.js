import { Navigate } from "react-router-dom";
import { getUserType } from "../../utils/auth";

export default function ProtectedRoute({ allowed, children }) {
  const role = getUserType();

  if (!role) return <Navigate to="/login" />;
  if (!allowed.includes(role)) return <Navigate to="/unauthorized" />;

  return children;
}
