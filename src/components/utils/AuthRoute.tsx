import { useContext } from "react";
import { AuthContext } from "../../core";
import { Navigate, useLocation } from "react-router-dom";

interface AuthRouteProps {
  children: JSX.Element;
  redirect?: string;
}

const AuthRoute = ({ children, redirect = "/home" }: AuthRouteProps) => {
  const user = useContext(AuthContext);
  const location = useLocation();

  if (user)
    return <Navigate to={redirect} state={{ from: location }} replace />;

  return children;
};

export default AuthRoute;
