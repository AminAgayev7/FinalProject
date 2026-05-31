import { Product } from "@/types/product";
import { promises as fs } from "fs";
import path from "path";

export async function fetchProductsServer(): Promise<Product[]> {
    const filePath = path.join(process.cwd(), "public", "data", "products.json");
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file);
}