import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export function useAuth() {
    const authcontext = useContext(AuthContext);
    if (!authcontext) {
        throw new Error("useAuth must be used inside AuthProvider");
    }
    return authcontext;
}