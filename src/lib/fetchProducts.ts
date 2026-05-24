import { Product } from "@/types/product";
import { getStock } from "./stockStorage";
export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch("/data/products.json");
        const products: Product[] = await res.json();
        return products.map((product) => ({
            ...product, stock: getStock(product.id, product.stock)
        }));
    } catch (err) {
        console.error("Error fetching products:", err);
        throw err;
    }
}