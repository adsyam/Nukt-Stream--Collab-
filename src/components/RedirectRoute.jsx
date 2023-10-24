import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

export const RedirectRoute = ({ children }) => {
  const { user } = useAuthContext();

  if (user) {
    return <Navigate to="/home" />;
  } else {
    return children;
  }
};
