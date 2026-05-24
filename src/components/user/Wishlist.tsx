"use client";

import { useWishlist } from "@/hooks/useWishList";
import ProductWishListGrid from "../product/ProductWishListGrid";

export default function Wishlist() {

    const { wishlist, mounted } = useWishlist();

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-zinc-50 pt-23 px-2 sm:px-6 lg:px-10">
            <h1 className="text-2xl sm:text-3xl font-semibold text-black mb-6">
                My Wishlist
            </h1>

            <ProductWishListGrid products={wishlist} />
        </div>
    );
}