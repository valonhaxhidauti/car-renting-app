"use client";

import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  setAuthenticated: (isAuthenticated: boolean) => void;
  setToken: (token: string | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [token, setTokenState] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setIsAuthenticated(true);
      setTokenState(storedToken);
    }
  }, []);

  const setAuthenticated = (isAuthenticated: boolean) => {
    setIsAuthenticated(isAuthenticated);
  };

  const setToken = (token: string | null) => {
    setTokenState(token);
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, token, setAuthenticated, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
