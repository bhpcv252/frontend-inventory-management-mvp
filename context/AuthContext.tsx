"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { UserRole } from "@/types";

type AuthUser = {
  userId: string;
  organizationId: string;
  role: UserRole;
};

type AuthContextValue = {
  user: AuthUser | null;
  token: string | null;
  login: (token: string) => void;
  logout: () => void;
  isLoading: boolean;
};

function decodeJwt(token: string): AuthUser {
  const payload = token.split(".")[1];
  const decoded = JSON.parse(
    atob(payload.replace(/-/g, "+").replace(/_/g, "/")),
  );
  return {
    userId: decoded.userId,
    organizationId: decoded.organizationId,
    role: decoded.role,
  };
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("token");
      if (saved) {
        const decoded = decodeJwt(saved);
        setToken(saved);
        setUser(decoded);
      }
    } catch {
      localStorage.removeItem("token");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = (newToken: string) => {
    const decoded = decodeJwt(newToken);
    localStorage.setItem("token", newToken);
    setToken(newToken);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
