import { Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isLoggedIn, user } = useUser();

  if (!isLoaded) return null; // Wait for Clerk to load

  // Only allow specific user
  const allowedEmail = "pi1portfoliosp@gmail.com";

  // if (!isLoggedIn /*|| user?.primaryEmailAddress?.emailAddress !== allowedEmail*/) {
  // return <Navigate to="/login" replace />;
  //}

  return children;
};

export default ProtectedRoute;
