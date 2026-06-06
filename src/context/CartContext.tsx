"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { getStock } from "@/lib/stockStorage";
import { storageGet, storageRemove, storageSet } from "@/lib/safeStorage";
import { useAuth } from "@/hooks/useAuth";
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
    const { user } = useAuth();
    const cartKey = `cart_${user?.email ?? "guest"}`;
    useEffect(() => {
        const saved = storageGet<CartItem[]>(cartKey, []);
        setItems(saved);
    }, [cartKey]);

    useEffect(() => {
        storageSet(cartKey, items);
    }, [items, cartKey]);

    const addToCart = (product: Product, size: string, color: string) => {
        const currentStock = getStock(product.id, product.stock)

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

            const currentQuantityInCart = existing ? existing.quantity : 0;

            if (currentQuantityInCart >= currentStock) {
                return prev;
            }
            if (existing) {
                return prev.map((item) => {
                    return (
                        ((item.product.id === product.id) && (item.selectedSize === size) && (item.selectedColor === color)) ? { ...item, quantity: item.quantity + 1 } : item
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
        const totalItemsInCart = storageGet(cartKey + "_total_items", 0);
        const newTotalCount = totalItemsInCart > 0 ? totalItemsInCart - 1 : 0;
        storageRemove(cartKey + "_total_items");
        storageSet(`${cartKey}_total_items`, newTotalCount);
    };

    const updateQuantity = (productId: number, size: string, color: string, quantity: number, stock?: number) => {

        if (quantity < 1) {
            return;
        }

        if (stock !== undefined && quantity > stock) {
            return;
        }

        setItems(function (prev) {
            return prev.map((item) => {
                if (
                    (item.product.id === productId) &&
                    (item.selectedSize === size) &&
                    (item.selectedColor === color)
                ) {
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


