import { Navigate, useLocation } from "react-router-dom";
import { logout } from "../config/Auth";
import { useEffect, useState } from "react";
import { Spinner } from "../components/utils";

// Pagina per il logout
const Logout = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    logout().then(() => {
      setLoading(false);
    });
  }, []);

  if (loading) return <Spinner />;

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default Logout;
