"use client";

import { createContext, useEffect, useState } from "react";
import { Product } from "@/types/product";
import { useAuth } from "@/hooks/useAuth";
import { storageGet, storageSet } from "@/lib/safeStorage";
import { useRouter } from "next/navigation";
type ChildrenType = {
    children: React.ReactNode;
};

type WishlistContextType = {
    wishlist: Product[];
    toggleWishlist: (product: Product) => void;
    mounted: boolean;
};

export const WishlistContext =
    createContext<WishlistContextType | null>(null);

export function WishlistProvider({ children }: ChildrenType) {
    const { user } = useAuth();
    const router = useRouter();
    const [wishlist, setWishlist] = useState<Product[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const saved = storageGet("wishlist", null);

        if (saved) {
            setWishlist(saved);
        }

        setMounted(true);
    }, []);


    useEffect(() => {

        if (mounted && !user) {
            setWishlist([]);
            storageSet("wishlist", []);
        }
    }, [user, mounted]);
    
    useEffect(() => {
        if (mounted) {
            storageSet("wishlist", wishlist);
        }
    }, [wishlist, mounted]);

    const toggleWishlist = (product: Product) => {

        if (!user) {
            router.push("/auth/login");
            return;
        }


        const exists = wishlist.find((item) => item.id === product.id);

        if (exists) {
            setWishlist(wishlist.filter((item) => item.id !== product.id));
        } else {
            setWishlist([...wishlist, product]);
        }
    };

    return (
        <WishlistContext.Provider
            value={{ wishlist, toggleWishlist, mounted, }}
        >
            {children}
        </WishlistContext.Provider>
    );
}