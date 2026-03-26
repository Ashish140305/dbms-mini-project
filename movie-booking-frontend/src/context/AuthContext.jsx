import { createContext, useContext, useState } from 'react';

// Create the Context
const AuthContext = createContext();

// Create the Provider Component
export function AuthProvider({ children }) {
  // This state will eventually be updated by your backend API response
  const [user, setUser] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use the Auth Context easily in any component
export function useAuth() {
  return useContext(AuthContext);
}