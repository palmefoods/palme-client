import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
    
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); 

  useEffect(() => {
    const storedUser = localStorage.getItem('palme_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const openAuthModal = (mode = 'login') => {
    setActiveTab(mode);
    setShowAuthModal(true);
  };

    
  const login = async (emailOrUser, passwordOrToken) => {
    
      
      
    if (typeof emailOrUser === 'object' && emailOrUser !== null) {
        setUser(emailOrUser);
        localStorage.setItem('palme_user', JSON.stringify(emailOrUser));
        localStorage.setItem('palme_token', passwordOrToken);
          
        return true;
    }

      
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const res = await axios.post(`${API_URL}/api/auth/login`, { 
          email: emailOrUser, 
          password: passwordOrToken 
      });
      
      const { user, token } = res.data;
      
      setUser(user);
      localStorage.setItem('palme_user', JSON.stringify(user));
      localStorage.setItem('palme_token', token);
      
      toast.success(`Welcome back, ${user.name.split(' ')[0]}!`);
      setShowAuthModal(false);
      return true;
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Login failed. Check your email/password.";
      toast.error(errorMsg);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('palme_user');
    localStorage.removeItem('palme_token');
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      loading, 
      login,  
      logout,
      showAuthModal,
      setShowAuthModal,
      openAuthModal,      
      activeTab,
      setActiveTab     
    }}>
      {children}
    </AuthContext.Provider>
  );
};