import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const PublicRoute = ({children}) => {
  const userCookie = Cookies.get("portalUserInfo");
  if (userCookie) return <Navigate to="/dashboard" />;
  return children;
};

export default PublicRoute;
