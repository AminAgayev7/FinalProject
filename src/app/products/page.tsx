import ProductList from "@/components/product/ProductList";

export default function ProductsPage() {
    return (
        <div className="flex flex-col items-center justify-center bg-zinc-50 font-sans p-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
                Products
            </h1>

            <ProductList />
        </div>
    );
}