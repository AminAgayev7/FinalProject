export interface Product {
    id: number;
    title: string;
    price: number;
    discount: number;
    category: string;
    gender: string;
    brand: string;
    sizes: string[];
    colors: string[];
    stock: number;
    rating: number;
    reviews: number;
    material: string;
    images: string[];
    description: string;
    comments: Comment[];
}

export type Comment = {
    id: number;
    user: string;
    rating: number;
    date: string;
    verified: boolean;
    comment: string;
    avatar: string;
};