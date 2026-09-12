"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CurrentUser, MOCK_USERS } from "@/data/users";

type AuthContextType = {
  user: CurrentUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  toggleStarColleague: (id: number) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<CurrentUser | null>(null);

  const login = (username: string, password: string): boolean => {
    const found = MOCK_USERS.find(
      (u) =>
        u.username.toLowerCase() === username.trim().toLowerCase() &&
        u.password === password,
    );

    if (found) {
      setUser({ ...found, savedColleagueIds: [...found.savedColleagueIds] });
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const toggleStarColleague = (id: number) => {
    if (!user) return;

    const exists = user.savedColleagueIds.includes(id);
    const updatedIds = exists
      ? user.savedColleagueIds.filter((item) => item !== id)
      : [...user.savedColleagueIds, id];

    setUser({ ...user, savedColleagueIds: updatedIds });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, toggleStarColleague }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
