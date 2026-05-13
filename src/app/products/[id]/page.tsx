'use client';


import ProductDetail from "@/components/product/ProductDetail";


export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {

    return (
        <ProductDetail params={params}></ProductDetail>
    )
}