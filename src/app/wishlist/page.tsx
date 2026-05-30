import { Metadata } from "next";
import Wishlist from "@/components/user/Wishlist";

export const metadata: Metadata = {
    title: "Wishlist",
};

export default function WishlistPage() {
    return <Wishlist />;
}