import { createContext, useEffect, useMemo, useState } from 'react';
import { setAuthToken } from '../services/api';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('eco_user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('eco_token'));

  useEffect(() => {
    if (token) {
      setAuthToken(token);
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('eco_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('eco_user');
    }
  }, [user]);

  useEffect(() => {
    if (token) {
      localStorage.setItem('eco_token', token);
    } else {
      localStorage.removeItem('eco_token');
    }
  }, [token]);

  const value = useMemo(
    () => ({
      user,
      token,
      updateUser: setUser,
      setToken,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
