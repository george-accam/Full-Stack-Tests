// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem("agriMarketUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password, userType) => {
    // Authentication logic
    const mockUser = {
      id: "1",
      email,
      name: email.split("@")[0],
      type: userType,
      token: "mock-token",
    };
    setUser(mockUser);
    localStorage.setItem("agriMarketUser", JSON.stringify(mockUser));
    navigate(userType === "farmer" ? "/farmer-dashboard" : "/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("agriMarketUser");
    navigate("/login");
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user,
    isFarmer: user?.type === "farmer",
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
