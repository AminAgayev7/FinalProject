export function getStock(productId: number, defaultStock: number): number {
    const saved = localStorage.getItem(`stock_${productId}`)
    if(saved !== null) {
        return JSON.parse(saved);
    } else {
        return defaultStock;
    }
}

export function deductStock(productId: number, currentStock: number, quantity: number):void {
    const newStock = Math.max(0, currentStock - quantity);
    localStorage.setItem(`stock_${productId}`, JSON.stringify(newStock));
}