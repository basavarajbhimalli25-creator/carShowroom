
import { Navigate, Outlet, useLocation } from "react-router-dom";

function ProtectedLayout() {
  const location = useLocation();

  // Check demo login status
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  // Redirect users who are not logged in
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}
      />
    );
  }

  // Display protected pages when logged in
  return <Outlet />;
}

export default ProtectedLayout;