import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

export default function RequireAuth({ children }) {
  const { authToken } = useContext(AuthContext);

  if (authToken.length <= 2) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
