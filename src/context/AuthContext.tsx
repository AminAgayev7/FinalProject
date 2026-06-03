"use client";

import { createContext, useState,useEffect, ReactNode } from "react";
import {storageGet, storageSet, storageRemove} from "@/lib/safeStorage";
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

        const currentEmail = storageGet("currentUser", null);

        const users = storageGet<(User & { password: string })[]>("data", []);

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

        const users = storageGet<(User & { password: string })[]>("data", []);;

        const found = users.find((u: User & { password: string }) => {
            return (u.email === email) && (bcrypt.compareSync(password, u.password))
        }
        );

        if (!found) {
            return false;
        }


        storageSet("currentUser", found.email);

        setUser(found);
        setIsAuthenticated(true);

        return true;
    }

    function logout() {

        storageRemove("currentUser");

        setUser(null);
        setIsAuthenticated(false);
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}