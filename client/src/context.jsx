import { createContext, useContext, useState, useEffect } from "react";
import API from "./api";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      API.get("/api/users/me")
        .then((response) => {
          setUser(response.data);
        })
        .catch(() => {
          localStorage.removeItem("token");
        });
    }
  }, []);

  const login = async ({ email, password }) => {
    const response = await API.post("/api/users/login", { email, password });
    const { token } = response.data;
    localStorage.setItem("token", token);
    const userResponse = await API.get("/api/users/me");
    setUser(userResponse.data);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
