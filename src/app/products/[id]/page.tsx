
import { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";
type Props = { params: Promise<{ id: string }> };
import { fetchProductsServer } from "@/lib/fetchProductsServer";
export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;
    const products = await fetchProductsServer();
    const product = products.find((p) => {
        return String(p.id) === id
    });
    return { title: product?.title ?? "Product" };
}

export default function ProductPage({ params }: Props) {
    return <ProductDetail params={params} />;
}