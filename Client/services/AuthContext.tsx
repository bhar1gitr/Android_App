import React, { createContext, useContext, useState, useEffect } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext<{
  isLoggedIn: boolean | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}>({ isLoggedIn: null, login: async () => {}, logout: async () => {} });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync('userToken').then((token) => {
      setIsLoggedIn(!!token);
    });
  }, []);

  const login = async (token: string) => {
    await SecureStore.setItemAsync('userToken', token);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);