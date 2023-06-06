import { useContext } from "react";
import { AuthContext } from "../../core";
import { Navigate, useLocation } from "react-router-dom";

interface PrivateRouteProps {
  redirect?: string;
  children: JSX.Element;
}

const PrivateRoute = ({ redirect = "/login", children }: PrivateRouteProps) => {
  const user = useContext(AuthContext);
  const location = useLocation();

  if (!user)
    return <Navigate to={redirect} state={{ from: location }} replace />;

  return children!;
};

export default PrivateRoute;
