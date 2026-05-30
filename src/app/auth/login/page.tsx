import { Metadata } from "next";
import LoginClient from "@/components/auth/login/LoginClient";

export const metadata: Metadata = {
    title: "Login",
};

export default function LoginPage() {
    return <LoginClient />;
}