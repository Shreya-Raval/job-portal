import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PublicRoute = ({ children }) => {
  const {user} = useAuth();

  if (user !== undefined && user) return <Navigate to="/dashboard" />;

  return children;
};

export default PublicRoute;
