import { Metadata } from "next";
import ContactClient from "@/components/contact/ContactClient";

export const metadata: Metadata = {
    title: "Contact",
};

export default function ContactPage() {
    return <ContactClient />;
}