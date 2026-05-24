"use client";

import { createContext, useContext, useEffect, useReducer } from "react";
import { Product } from "@/types/product";


type ChildrenType = {
    children: React.ReactNode;
};

type WishlistContextType = {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
};

type WishlistAction = { type: "TOGGLE"; payload: Product };

export const WishlistContext = createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: ChildrenType) {


    function wishlistReducer(state: Product[], action: WishlistAction): Product[] {
        switch (action.type) {
            case "TOGGLE":
                const exists = state.find((item) => {
                    return item.id === action.payload.id
                });
                if (exists) {
                    return state.filter((item) => {
                        return item.id !== action.payload.id
                    })
                } else {
                    return [...state, action.payload]
                }
            default:
                return state;
        }
    }

    const [wishlist, dispatch] = useReducer(wishlistReducer, [], (): Product[] => {
        if (typeof window === "undefined") {
            return [];
        }
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            return JSON.parse(saved);
        } else {
            return []
        }
    });

    const toggleWishlist = (product: Product) => {
        dispatch({ type: "TOGGLE", payload: product });
    };
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }, [wishlist]);



    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

