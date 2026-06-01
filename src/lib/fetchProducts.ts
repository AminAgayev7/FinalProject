import { Product } from "@/types/product";

export async function fetchProducts(): Promise<Product[]> {
    try {
        const res = await fetch("/data/products.json");
        const products: Product[] = await res.json();


        const { getStock } = await import("./stockStorage");
        return products.map((product) => ({
            ...product,
            stock: getStock(product.id, product.stock)
        }));
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        console.error("Error fetching products:", message);
        throw err;
    }
}