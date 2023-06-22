import { useState, useEffect, createContext } from "react";
import { auth } from "../config/firebase";
import { User, onAuthStateChanged } from "firebase/auth";
import { Center, Spinner, Title } from "../components/utils";

type AuthContextType = User | null;

export const AuthContext = createContext<AuthContextType>(null);

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
  if (loading)
    return (
      <Center>
        <Title>
          <Spinner />
        </Title>
      </Center>
    );

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
