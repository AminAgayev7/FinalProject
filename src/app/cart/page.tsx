import { Metadata } from "next";
import CartPage from "@/components/cart/CartPageClient";

export const metadata: Metadata = {
    title: "Cart",
};

export default function CartPagePage() {
    return <CartPage />;
}