export function storageGet<T>(key: string, fallback: T): T {
    try {
        const item = localStorage.getItem(key);
        if (!item) 
            {
                return fallback;
            }
        return JSON.parse(item) as T;
    } catch {
        return fallback;
    }
}

export function storageSet(key: string, value: unknown): void {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
        console.error(`localStorage write failed for "${key}":`, err);
    }
}

export function storageRemove(key: string): void {
    try {
        localStorage.removeItem(key);
    } catch (err) {
        console.error(`localStorage remove failed for "${key}":`, err);
    }
}