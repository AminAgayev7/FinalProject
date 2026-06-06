import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
};
import ProductList from "@/components/product/ProductList";
import { Suspense } from "react";

export default function ProductsPage() {
    return (
        <div className="flex flex-col items-center justify-center dark:bg-gray-950 bg-gray-100 font-sans p-8">
            <Suspense fallback={<div className="min-h-screen" />}>
                <ProductList />
            </Suspense>
        </div>
    );
}