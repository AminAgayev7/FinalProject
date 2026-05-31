export const discountCodes: Record<string, number> = {
    "save10": 10,
    "save20": 20,
    "modex15": 15,
    "welcome5": 5,
}

export function applyDiscount(code: string, total: number): { valid: boolean; discount: number; finalPrice: number } {
    const percentage = discountCodes[code.toLowerCase()];
    if(!percentage) {
        return { valid: false, discount: 0, finalPrice: total };
    }
    const discount = (percentage / 100) * total;
    return { valid: true, discount, finalPrice: total - discount };
}