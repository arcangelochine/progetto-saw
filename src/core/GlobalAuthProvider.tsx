import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { Spinner } from "../components/utils";

type AuthContextType = User | null;

export const AuthContext = React.createContext<AuthContextType>(null);

interface AuthProviderProps {
  children?: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<AuthContextType>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  // Mentre sta caricando, mostra uno spinner
  if (loading) {
    return <Spinner />;
  }

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
