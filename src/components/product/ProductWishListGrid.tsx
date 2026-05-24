import ProductCard from "./ProductCard";


import { Product } from "@/types/product";
type Props = {
    products: Product[];
};

function ProductWishListGrid({ products }: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 items-start">
            {products.map((item: Product, index) => (
                <ProductCard key={index} product={item}></ProductCard>
            ))}
        </div>
    );
}

export default ProductWishListGrid;