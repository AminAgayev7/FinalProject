import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products",
};
import ProductList from "@/components/product/ProductList";

export default function ProductsPage() {
    return (
        <div className="flex flex-col items-center justify-center dark:bg-gray-950 bg-zinc-50 font-sans p-8">
            <ProductList />
        </div>
    );
}