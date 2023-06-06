import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../core";

const PrivateRoute = ({ ...props }) => {
  const user = useContext(AuthContext);

  if (user === null) return <Navigate to="/login" />;

  return props.children;
};

export default PrivateRoute;
