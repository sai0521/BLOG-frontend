import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for existing token on initial load
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');
      const storedEmail = localStorage.getItem('userEmail');
      
      if (token && storedEmail) {
        try {
          // Verify token with backend
          const res = await axios.get(`${import.meta.env.VITE_API_URL}auth/verify`, {
            headers: { Authorization: `Bearer ${token}` }
          });
          
          if (res.data.success) {
            setUser({ email: storedEmail });
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          } else {
            // Clear invalid token
            localStorage.removeItem('token');
            localStorage.removeItem('userEmail');
          }
        } catch (error) {
          console.error('Token verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('userEmail');
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, []);

  const login = (token, email) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userEmail', email);
    setUser({ email });
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userEmail');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {loading ? <div>Loading...</div> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);