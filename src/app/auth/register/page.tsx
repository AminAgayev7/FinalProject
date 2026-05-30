import { Metadata } from "next";
import RegisterClient from "@/components/auth/register/RegisterClient";

export const metadata: Metadata = {
    title: "Register",
};

export default function RegisterPage() {
    return <RegisterClient />;
}