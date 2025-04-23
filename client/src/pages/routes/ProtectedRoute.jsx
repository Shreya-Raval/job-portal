import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ allowedRoles }) => {
  const userCookie = Cookies.get("portalUserInfo");

  if (!userCookie) return <Navigate to="/login" />;

  try {
    const user = JSON.parse(userCookie);
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      return <Navigate to="/login" />;
    }

    return <Outlet context={{ user }} />;
  } catch (error) {
    console.error("Invalid user cookie");
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
