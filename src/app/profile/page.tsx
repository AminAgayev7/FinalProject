import { Metadata } from "next";
import UserProfile from "@/components/profile/ProfileClient";

export const metadata: Metadata = {
    title: "Profile",
};

export default function ProfilePage() {
    return <UserProfile />;
}