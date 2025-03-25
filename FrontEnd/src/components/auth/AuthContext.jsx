import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// Create context
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // Get token from local storage
  const storedToken = localStorage.getItem("token");
  
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(storedToken || "");
  const [loading, setLoading] = useState(true); // Add loading state

  // Function to decode JWT and set user state
  const decodeTokenAndSetUser = (token) => {
    if (!token) return;
    try {
      const decodedToken = JSON.parse(atob(token.split(".")[1])); // Decode JWT
      setUser({
        email: decodedToken.sub,
        role: decodedToken.authorities?.[0]?.authority || "ROLE_USER",
      });
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } catch (error) {
      console.error("Invalid Token:", error);
      logout();
    }
  };

  // Restore user from token on page load
  useEffect(() => {
    if (token) {
      decodeTokenAndSetUser(token);
    }
    setLoading(false); // Set loading to false after checking
  }, [token]);

  // Login function
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", { email, password });
      
      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      decodeTokenAndSetUser(res.data.token);

      return res.data;
    } catch (error) {
      return handleError(error);
    }
  };

  // Error handling function
  const handleError = (error) => {
    if (error.response) {
      console.error("API Error:", error.response.data);
      return { error: error.response.data };
    } else if (error.request) {
      console.error("Network Error: No response received.");
      return { error: "No response from server" };
    } else {
      console.error("Unexpected Error:", error.message);
      return { error: "An unexpected error occurred" };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setToken("");
    delete axios.defaults.headers.common["Authorization"];
    navigate("/home");
  };

  // Show loading screen while restoring session
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
