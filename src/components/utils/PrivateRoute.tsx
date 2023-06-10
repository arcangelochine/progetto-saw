import { useContext } from "react";
import { AuthContext } from "../../core";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const user = useContext(AuthContext);
  const location = useLocation();

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;
