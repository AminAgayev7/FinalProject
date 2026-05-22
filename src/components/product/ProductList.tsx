'use client';

import { useEffect, useState, useMemo } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/fetchProducts";
import ProductCard from "@/components/product/ProductCard";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { useFilter } from "@/hooks/useFilter";
import FilterPanel from "../FilterPanel";

import { useSearchParams } from "next/navigation";
const sort_options = [
    { label: "Default", value: "default" },
    { label: "Price: Low to High", value: "ascending" },
    { label: "Price: High to Low", value: "descending" },
    { label: "Top Rated", value: "rating_descending" },
];

export default function ProductList() {

    const searchParams = useSearchParams();

    useEffect(() => {
        const query = searchParams.get("q");
        if (query) {
            setSearch(query);
        }
    }, [searchParams]);

    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            fetchProducts().then(data => {
                setProducts(data);
                setLoading(false);
            });
        }, 3000);
    }, []);

    const {
        search, setSearch,
        selectedGender, handleGenderChange,
        selectedCategory, setSelectedCategory,
        selectedSize, setSelectedSize,
        selectedColor, setSelectedColor,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        sort, setSort,
        genders, categories, sizes, colors,
        filtered, resetFilters, hasFilters,
        selectedSeason, setSelectedSeason, seasons
    } = useFilter(products);

    return (
        <main className="min-h-screen bg-zinc-50 mt-8 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h1 className="text-3xl font-bold text-gray-900 text-center my-8">Find the product you want!</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {!loading && (
                        <aside className="w-full lg:w-64">
                            <FilterPanel
                                search={search} setSearch={setSearch}
                                selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} seasons={seasons}
                                selectedGender={selectedGender} handleGenderChange={handleGenderChange} genders={genders}
                                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories}
                                selectedSize={selectedSize} setSelectedSize={setSelectedSize} sizes={sizes}
                                selectedColor={selectedColor} setSelectedColor={setSelectedColor} colors={colors}
                                minPrice={minPrice} setMinPrice={setMinPrice}
                                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                                resetFilters={resetFilters} hasFilters={hasFilters}
                            />
                        </aside>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm text-gray-500">
                                {loading ? "Loading..." : `${filtered.length} products found`}
                            </p>
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                className="border text-black border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors"
                            >
                                {sort_options.map((option, index) => (
                                    <option key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>


                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
                                <Skeleton count={24} />
                            </div>
                        )}
                        {(!loading && filtered.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
                                {filtered.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </div>
                        )}

                        {(!loading && filtered.length === 0) && (
                            <div className="flex flex-col items-center justify-center py-24 text-center">

                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No products found</h3>
                                <p className="text-gray-500 mb-6">Try adjusting your filters or search term.</p>

                                <Button onClick={resetFilters}
                                    className="bg-black text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors">
                                    Reset Filters
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}