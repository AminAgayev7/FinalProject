'use client';

import { useCart } from "@/hooks/useCart";
import { useEffect } from "react";
import Link from "next/link";
import { storageGet } from "@/lib/safeStorage";
import CartItem from "@/components/cart/CartItem";
import CartSummary from "@/components/cart/CartSummary";
import { useAuth } from "@/hooks/useAuth";
export default function CartPage() {
    const { isAuthenticated } = useAuth();
    const { items, removeFromCart, updateQuantity, totalPrice } = useCart();

    let totalDiscount = 0;
    let originalTotal = 0;

    items.forEach((item) => {

        const original = item.product.price * item.quantity;

        const discounted = item.product.discount ? (item.product.price - (item.product.price * item.product.discount) / 100) * item.quantity : original;

        totalDiscount = totalDiscount + (original - discounted);
        originalTotal = originalTotal + original;
    });

    useEffect(() => {
        document.body.classList.add("hide-footer");

        return () => {
            document.body.classList.remove("hide-footer");
        };
    }, []);
    if (!isAuthenticated) {
        return (
            <main className="min-h-screen dark:bg-gray-950 bg-zinc-50 pt-20 sm:pt-30 pb-16">
                <div className="container mx-auto px-4 sm:px-6">
                    <h1 className="text-xl sm:text-2xl dark:text-gray-300 text-gray-900 font-bold mb-4">
                        Shopping Cart
                    </h1>
                    <section className="flex flex-col justify-center min-h-[60vh] md:flex-row gap-6">
                        <div className="w-full flex flex-col items-center justify-center min-h-[50vh] text-center">
                            <div className="w-full text-center py-10">
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    Please log in to view your cart.
                                </p>
                                <Link href="/auth/login" className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                                    Log in
                                </Link>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        );
    }
    return (
        <main className="min-h-screen dark:bg-gray-950 bg-zinc-50 pt-20 sm:pt-30 ">
            <div className="container mx-auto px-4 sm:px-6">
                <h1 className="text-xl sm:text-2xl dark:text-gray-300 text-gray-900 font-bold mb-4">
                    Shopping Cart
                </h1>

                <section className="flex flex-col justify-center min-h-[60vh] md:flex-row gap-6">

                    {items.length === 0 ? (
                        <div className="w-full flex flex-col items-center justify-center min-h-[50vh] text-center">
                            <p className="text-gray-700 dark:text-gray-300 mb-4">
                                Your cart is empty.
                            </p>

                            <Link href="/" className="text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-colors">
                                Continue shopping
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="flex flex-col gap-4 w-full md:flex-1">
                                {items.map((item) => (
                                    <CartItem
                                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`}
                                        item={item}
                                        removeFromCart={removeFromCart}
                                        updateQuantity={updateQuantity}
                                        link={`/products/${item.product.id}`}
                                    />
                                ))}
                            </div>

                            <CartSummary
                                originalTotal={originalTotal}
                                totalDiscount={totalDiscount}
                                totalPrice={totalPrice}
                            />
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}