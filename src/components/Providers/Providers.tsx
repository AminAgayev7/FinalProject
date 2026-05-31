'use client';

import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import ErrorBoundary from "../ErrorBoundary";
export default function Providers({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary>
            <CartProvider>
                <AuthProvider>
                    <WishlistProvider>
                        {children}
                    </WishlistProvider>
                </AuthProvider>
            </CartProvider>
        </ErrorBoundary>

    );
}