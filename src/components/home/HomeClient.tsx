"use client";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/fetchProducts";
import ProductCard from "@/components/product/ProductCard";
import Link from "next/link";
import Skeleton from "@/components/ui/Skeleton";
import Button from "@/components/ui/Button";
export default function Home() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, seterror] = useState<string | null>(null);
    useEffect(() => {
        setTimeout(async () => {
            try {
                const data = await fetchProducts();
                setProducts(data);
                setLoading(false);
            } catch (err) {
                seterror(`Error fetching products: ${err}`);
                setLoading(false);
            }
        }, 3000);
    }, []);

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-screen dark:bg-gray-950 bg-zinc-50 px-5">
                <h1 className="text-2xl text-red-500">{error}</h1>
                <Button onClick={() => window.location.reload()} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-colors">
                    Reload Page
                </Button>
            </div>
        )
    }

    const newArrivals = products.slice(products.length - 6, products.length).reverse();
    const skeletonCount = loading ? 6 : newArrivals.length;
    const popular = products.filter((product) => {
        return product.rating >= 4.7;
    });

    return (
        <main className="bg-zinc-50 dark:bg-gray-950 min-h-screen pt-9">
            <section className="relative min-h-screen mt-6 flex items-center overflow-hidden">
                <img
                    src={"https://wallpaperaccess.com/full/4624210.jpg"}
                    alt="Hero"
                    className="absolute inset-0 w-full min-h-full object-cover  object-center"
                />
                <div className="absolute inset-0 bg-black/55" />
                <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
                    <div className="max-w-xl">
                        <p className="text-sm uppercase tracking-widest text-gray-300 mb-4">
                            New Season
                        </p>
                        <h1 className="text-4xl sm:text-7xl caveat  text-white leading-tight mb-6">
                            Discover Your Style..
                        </h1>
                        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                            Premium clothing for every occasion.
                            <br />
                            Shop the latest trends.
                        </p>
                        <div className="flex flex-wrap flex-row gap-4">
                            <Link href="/products">
                                <Button className="border border-gray-600 text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors">
                                    Shop Now
                                </Button>
                            </Link>
                            <Link href="#newArrivals">

                                <Button className="border border-gray-600 text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors">
                                    New Arrivals
                                </Button>
                            </Link>

                            <Link href="#mostPopular">

                                <Button className="border border-gray-600 text-white px-8 py-3 rounded font-semibold hover:bg-white/10 transition-colors">Most Popular</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="max-w-7xl mx-auto px-6 py-16" id="newArrivals">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold dark:text-white text-gray-900">New Arrivals</h2>
                    <Link
                        href="/products"
                        className="text-sm text-gray-500 dark:text-white hover:text-black transition-colors"
                    >
                        View all
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {loading ? (
                        <Skeleton count={skeletonCount} />
                    ) : (
                        newArrivals.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </section>



            <section className="max-w-7xl mx-auto px-6 py-16" id="mostPopular">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-2xl font-bold dark:text-white text-gray-900">Most Popular</h2>
                    <Link
                        href="/products"
                        className="text-sm dark:text-white text-gray-500 hover:text-black transition-colors"
                    >
                        View all
                    </Link>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {loading ? (
                        <Skeleton count={12} />
                    ) : (
                        popular.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    )}
                </div>
            </section>
            <section className="dark:bg-black/15 bg-zinc-950 dark:shadow-blue-950 dark:shadow-lg shadow-lg shadow-gray-300 text-white py-20 text-center">
                <p className="text-xs uppercase tracking-[0.3em] text-gray-400 mb-3">Limited Time</p>
                <h2 className="text-4xl font-light mb-4 tracking-tight">Up to 20% Off</h2>
                <p className="text-gray-400 text-sm mb-8 font-light">Selected items. While stocks last.</p>
                <Link href="/products">

                    <Button className="border border-white/50 text-white px-10 py-3 text-sm tracking-widest uppercase font-light hover:bg-white hover:text-black transition-all duration-300">
                        See Deals
                    </Button>
                </Link>
            </section>
        </main>
    );
}














