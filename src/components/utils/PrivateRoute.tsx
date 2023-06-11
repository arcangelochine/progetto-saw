import { useContext } from "react";
import { AuthContext } from "../../core";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  children: JSX.Element;
  redirect?: string;
}

const PrivateRoute = ({ children, redirect = "/login" }: PrivateRouteProps) => {
  const user = useContext(AuthContext);
  const location = useLocation();

  if (user) return children;

  return <Navigate to={redirect} state={{ from: location }} replace />;
};

export default PrivateRoute;
