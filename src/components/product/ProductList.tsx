'use client';

import { useEffect, useState } from "react";
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
    const [error, seterror] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const query = searchParams.get("q");
        if (query) {
            setSearch(query);
        }
    }, [searchParams]);

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

    const {
        search, setSearch,
        selectedGender, handleGenderChange,
        selectedCategory, setSelectedCategory,
        selectedSize, setSelectedSize,
        selectedColors, toggleColor,
        minPrice, setMinPrice,
        maxPrice, setMaxPrice,
        sort, setSort,
        genders, categories, sizes, colors,
        filtered, resetFilters, hasFilters,
        selectedSeason, setSelectedSeason, seasons
    } = useFilter(products);

    if (!loading && filtered.length === 0) {
        return (
            <div className="flex flex-col items-center min-h-screen justify-center py-24 text-center">
                <h3 className="text-xl font-semibold dark:text-gray-300 text-gray-800 mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Try adjusting your filters or search term.</p>
                <Button onClick={resetFilters}
                    className="bg-black dark:bg-gray-800 text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors">
                    Reset Filters
                </Button>
            </div>
        )
    }

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

    return (
        <main className="min-h-screen dark:bg-gray-950 bg-zinc-50 mt-10 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h1 className="text-3xl font-bold dark:text-gray-300 text-gray-900 text-center my-8">Find the product you want!</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start"> 
                    {!loading && (
                        <aside className="w-full lg:w-64">
                            <FilterPanel
                                search={search} setSearch={setSearch}
                                selectedSeason={selectedSeason} setSelectedSeason={setSelectedSeason} seasons={seasons}
                                selectedGender={selectedGender} handleGenderChange={handleGenderChange} genders={genders}
                                selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} categories={categories}
                                selectedSize={selectedSize} setSelectedSize={setSelectedSize} sizes={sizes}
                                selectedColors={selectedColors} toggleColor={toggleColor} colors={colors}
                                minPrice={minPrice} setMinPrice={setMinPrice}
                                maxPrice={maxPrice} setMaxPrice={setMaxPrice}
                                resetFilters={resetFilters} hasFilters={hasFilters}
                            />
                        </aside>
                    )}

                    <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-6">
                            <p className="text-sm dark:text-gray-300 text-gray-500">
                                {loading ? "Loading..." : `${filtered.length} products found`}
                            </p>
                            <select
                                value={sort}
                                onChange={e => setSort(e.target.value)}
                                className="border text-black dark:text-gray-300 border-gray-300 dark:border-gray-600 dark:bg-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-gray-500 transition-colors"
                            >
                                {sort_options.map((option, index) => (
                                    <option className="dark:bg-gray-800 dark:text-gray-300" key={index} value={option.value}>{option.label}</option>
                                ))}
                            </select>
                        </div>

                        {loading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
                                <Skeleton count={12} />
                            </div>
                        )}
                        {(!loading && filtered.length > 0) && (
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 items-stretch">
                                {filtered.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}