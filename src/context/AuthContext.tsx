"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import bcrypt from "bcryptjs-react";

interface User {
    email: string;
    firstName: string;
    lastName: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => boolean;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const currentEmail = localStorage.getItem("currentUser");
        if (!currentEmail) {
            return;
        }
        const users = JSON.parse(localStorage.getItem("data") || "[]");
        const found = users.find((u: User) => {
            return u.email === currentEmail
        });
        if (found) {
            setUser(found);
        }
    }, []);

    function login(email: string, password: string): boolean {
        if (typeof window === "undefined") {
            return false;
        }
        const users = JSON.parse(localStorage.getItem("data") || "[]");
        const found = users.find((u: User & { password: string }) => {
                return u.email === email && bcrypt.compareSync(password, u.password)
        });
        if (!found) {
            return false;
        }
        localStorage.setItem("currentUser", found.email);
        localStorage.setItem("message", "User logged in!");
        setUser(found);
        return true;
    }

    function logout() {
        localStorage.removeItem("currentUser");
        localStorage.removeItem("message");
        setUser(null);
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

