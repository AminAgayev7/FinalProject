
import { Metadata } from "next";
import ProductDetail from "@/components/product/ProductDetail";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params;

    const products = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/data/products.json`).then(r => r.json());
    const product = products.find((p: { id: string | number }) => {
        return String(p.id) === id
    });

    return {
        title: product?.title ?? "Product",
    };
}

export default function ProductPage({ params }: Props) {
    return <ProductDetail params={params} />;
}