"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface AuthContextType {
  isLoggedIn: boolean;
  login: (username: string, password: string) => void;
  signup: (username: string, password: string, name: string, email: string) => void;
  logout: () => void;
  user: { username: string; name: string; email: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ username: string; name: string; email: string } | null>(null);

  useEffect(() => {
    // 페이지 로드 시 localStorage에서 로그인 상태 확인
    const savedAuth = localStorage.getItem("auth");
    const savedUsers = localStorage.getItem("users");
    
    if (savedAuth && savedUsers) {
      const authData = JSON.parse(savedAuth);
      const users = JSON.parse(savedUsers);
      const userData = users.find((u: any) => u.username === authData.username);
      
      if (userData) {
        setIsLoggedIn(true);
        setUser({
          username: userData.username,
          name: userData.name,
          email: userData.email,
        });
      }
    }
  }, []);

  const signup = (username: string, password: string, name: string, email: string) => {
    // 사용자 데이터 저장
    const savedUsers = localStorage.getItem("users");
    const users = savedUsers ? JSON.parse(savedUsers) : [];
    
    // 아이디 중복 확인
    if (users.find((u: any) => u.username === username)) {
      throw new Error("이미 사용 중인 아이디입니다.");
    }
    
    // 새 사용자 추가
    const newUser = { username, password, name, email };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    
    // 자동 로그인
    const authData = { username, isLoggedIn: true };
    localStorage.setItem("auth", JSON.stringify(authData));
    setIsLoggedIn(true);
    setUser({ username, name, email });
  };

  const login = (username: string, password: string) => {
    // 사용자 데이터 확인
    const savedUsers = localStorage.getItem("users");
    if (!savedUsers) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
    
    const users = JSON.parse(savedUsers);
    const userData = users.find(
      (u: any) => u.username === username && u.password === password
    );
    
    if (!userData) {
      throw new Error("아이디 또는 비밀번호가 올바르지 않습니다.");
    }
    
    // 로그인 성공
    const authData = { username, isLoggedIn: true };
    localStorage.setItem("auth", JSON.stringify(authData));
    setIsLoggedIn(true);
    setUser({
      username: userData.username,
      name: userData.name,
      email: userData.email,
    });
  };

  const logout = () => {
    localStorage.removeItem("auth");
    setIsLoggedIn(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, signup, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
