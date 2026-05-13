import { Product } from "@/types/product";
export async function fetchProducts() {
    try {
        const res = await fetch("/data/products.json");
        const products: Product[] = await res.json();
        return products;
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
}