"use client";

import { useWishlist } from "@/hooks/useWishList";
import ProductWishListGrid from "../product/ProductWishListGrid";
import { useAuth } from "@/hooks/useAuth";
import Button from "../ui/Button";
import Link from "next/link";
export default function Wishlist() {
    const { isAuthenticated } = useAuth();
    const { wishlist, mounted } = useWishlist();

    if (!mounted) {
        return null;
    }

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-gray-950 pt-23 px-2 sm:px-6 lg:px-10">
            {
                !isAuthenticated ? (

                    <div className="flex flex-col items-center min-h-screen justify-center py-24 text-center">
                        <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-800 mb-2">You need to be logged in to view your wishlist.</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-6">Please log in to see your favorite products.</p>
                        <Link href="/auth/login">
                            <Button className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">
                                Log In
                            </Button>
                        </Link>
                    </div>
                ) : <div>
                    <h1 className="text-2xl sm:text-3xl font-semibold dark:text-gray-300 text-black mb-6">
                        My Wishlist
                    </h1>
                    <ProductWishListGrid products={wishlist} />
                </div>


            }



        </div>
    );
}