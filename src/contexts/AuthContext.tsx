import { createContext, useContext, useEffect, useState } from "react";

type AuthContextProps = {
  isAuthenticated: boolean,
  login: VoidFunction
};

const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  function login() {
    localStorage.setItem('isAuthenticated', JSON.stringify(true));
    setIsAuthenticated(true);
  }

  useEffect(() => {
    setIsAuthenticated(JSON.parse(localStorage.getItem('isAuthenticated') ?? 'false'));
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
