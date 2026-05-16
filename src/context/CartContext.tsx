"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
export interface CartItem {
    product: Product;
    quantity: number;
    selectedSize: string;
    selectedColor: string;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, size: string, color: string) => void;
    removeFromCart: (productId: number, size: string, color: string) => void;
    updateQuantity: (productId: number, size: string, color: string, quantity: number) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;

}

export const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([]);
    
    useEffect(() => {
        const saved = localStorage.getItem("cart");
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, size: string, color: string) => {


        setItems((prev) => {
            const existing = prev.find(
                (item) => {
                    return (
                        (item.product.id === product.id) &&
                        (item.selectedSize === size) &&
                        (item.selectedColor === color)
                    );
                }
            );

            if (existing) {
                return prev.map((item) => {
                    return (
                        ((item.product.id === product.id) && (item.selectedSize === size) && (item.selectedColor === color)) ? { ...item, quantity: item.quantity + 1 }: item
                    )
                }
                );
            } else {
                return [...prev, { product, quantity: 1, selectedSize: size, selectedColor: color }];
            }
        });
    };

    const removeFromCart = (productId: number, size: string, color: string) => {
        setItems(function (prev) {
            return prev.filter((item) => {
                return !((item.product.id === productId) && (item.selectedSize === size) && (item.selectedColor === color));
            });
        });
    };

    const updateQuantity = (productId: number, size: string, color: string, quantity: number) => {
        if (quantity < 1) {
            return;
        }
        setItems(function (prev) {
            return prev.map((item) => {
                if ((item.product.id === productId) && (item.selectedSize === size) && (item.selectedColor === color)) {
                    return { ...item, quantity: quantity };
                } else {
                    return item;
                }
            });
        });
    };

    const clearCart = () => setItems([]);

    let totalItems = 0;

    for (let i = 0; i < items.length; i++) {
        totalItems = totalItems + items[i].quantity;
    }
    let totalPrice = 0;

    for (const item of items) {
        let price;

        if (item.product.discount) {
            price = item.product.price - (item.product.price * item.product.discount) / 100;
        } else {
            price = item.product.price;
        }

        totalPrice = totalPrice + price * item.quantity;
    }

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice }}>
            {children}
        </CartContext.Provider>
    );
}


