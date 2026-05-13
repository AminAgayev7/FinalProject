import { CartContext } from "@/context/CartContext";
import { useContext } from "react";
export function useCart() {
    const ctxOfCart = useContext(CartContext);
    if (!ctxOfCart) {
        throw new Error("useCart must be used within CartProvider");
    }
    return ctxOfCart;
}