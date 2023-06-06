import React, { useState, useEffect } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";

type AuthContextType = User | null;

export const AuthContext = React.createContext<AuthContextType>(null);

interface AuthProviderProps {
  children?: React.ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => setUser(user));
    return unsubscribe();
  }, []);

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
