"use client";

import { createContext, useState,useEffect, ReactNode } from "react";

import bcrypt from "bcryptjs-react";

interface User {
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => boolean;
    logout: () => void;
    loading: boolean;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const currentEmail = localStorage.getItem("currentUser");

        if (!currentEmail) {
            return;
        }
        const users = JSON.parse(
            localStorage.getItem("data") || "[]"
        );

        const found = users.find((u: User) => {
            return u.email === currentEmail
        }
        );

        if (found) {
            setUser(found);
            setIsAuthenticated(true);
        }

        setLoading(false);
    }, []);

    function login(email: string, password: string): boolean {

        const users = JSON.parse(
            localStorage.getItem("data") || "[]"
        );

        const found = users.find((u: User & { password: string }) => {
            return (u.email === email) && (bcrypt.compareSync(password, u.password))
        }
        );

        if (!found) {
            return false;
        }

        localStorage.setItem("currentUser",found.email);

        setUser(found);
        setIsAuthenticated(true);

        return true;
    }

    function logout() {

        localStorage.removeItem("currentUser");

        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}