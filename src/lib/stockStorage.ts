import { storageGet, storageSet } from "@/lib/safeStorage";
export function getStock(productId: number, defaultStock: number): number {
    const saved = storageGet(`stock_${productId}`, null);
    if(saved !== null) {
        return saved;
    } else {
        return defaultStock;
    }
}

export function deductStock(productId: number, currentStock: number, quantity: number):void {
    const newStock = Math.max(0, currentStock - quantity);
    storageSet(`stock_${productId}`, newStock);
}