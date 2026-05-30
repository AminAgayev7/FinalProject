export const discountCodes: Record<string, number> = {
    "SAVE10": 10,
    "SAVE20": 20,
    "MODEX15": 15,
    "WELCOME5": 5,
}

export function applyDiscount(code: string, total: number): { valid: boolean; discount: number; finalPrice: number } {
    const percentage = discountCodes[code.toUpperCase()];
    if(!percentage) {
        return { valid: false, discount: 0, finalPrice: total };
    }
    const discount = (percentage / 100) * total;
    return { valid: true, discount, finalPrice: total - discount };
}