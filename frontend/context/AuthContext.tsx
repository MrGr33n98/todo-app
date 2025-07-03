import React, { createContext, useState, useEffect, useContext, ReactNode, useCallback } from 'react';
import { User } from '../types';
import * as api from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (username: string, password_for_demo: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const initAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const userData = await api.getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Session expired or token is invalid.", error);
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    initAuth();
  }, [initAuth]);

  const login = async (username: string, password_for_demo: string) => {
    const tokenData = await api.loginUser(username, password_for_demo);
    localStorage.setItem('token', tokenData.access_token);
    const userData = await api.getCurrentUser();
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const value = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
