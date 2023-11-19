import { Navigate } from "react-router-dom"
import { useAuthContext } from "../../context/AuthContext"

export default function ProtectedRoute({ children }) {
  const { user } = useAuthContext()

  if (!user) {
    return <Navigate to="/" />
  }
  return children
}
