'use client';

import { useEffect, useState, useMemo } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/fetchProducts";
import ProductCard from "@/components/product/ProductCard";
import Skeleton from "../ui/Skeleton";
import Button from "../ui/Button";
import { useFilter } from "@/hooks/useFilter";
import Input from "../ui/Input";
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
    } = useFilter(products);

    return (
        <main className="min-h-screen bg-zinc-50 pb-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <h1 className="text-3xl font-bold text-gray-900 text-center my-8">Find the product you want!</h1>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {
                        !loading && (
                            <aside className="w-full lg:w-64">

                                <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24 flex flex-col gap-6">
                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2" htmlFor="search">Search</label>

                                        <Input id="search" type="text"
                                            placeholder="Search products..."
                                            value={search}
                                            onChange={(e) => setSearch(e.target.value)}
                                            className="w-full border border-gray-300 rounded-lg text-black px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors">

                                        </Input>
                                    </div>


                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Gender</label>
                                        <div className="flex flex-col gap-1">
                                            {genders.map((gender) => (
                                                <Button key={gender}
                                                    onClick={() => handleGenderChange(selectedGender === gender ? "" : gender)}
                                                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedGender === gender ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                                                    {gender}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>


                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Category</label>
                                        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                                            {categories.map((category) => (

                                                <Button key={category}
                                                    onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                                                    className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category ? "bg-black text-white" : "text-gray-600 hover:bg-gray-100"}`}>
                                                    {category}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>


                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Size</label>
                                        <div className="flex flex-wrap gap-2">
                                            {sizes.map((size) => (

                                                <Button key={size}
                                                    onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                                                    className={`px-3 py-1 rounded border text-xs font-medium transition-colors ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-300 hover:border-black"}`}>
                                                    {size}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Color</label>
                                        <div className="flex flex-wrap gap-2">
                                            {colors.map((color) => (

                                                <Button key={color}
                                                    onClick={() => setSelectedColor(selectedColor === color ? "" : color)}
                                                    className={`px-3 py-1 rounded border text-xs font-medium transition-colors ${selectedColor === color ? "bg-black text-white border-black" : "bg-white text-gray-600 border-gray-300 hover:border-black"}`}>
                                                    {color}
                                                </Button>
                                            ))}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="font-semibold text-gray-700 block mb-2">Price Range</label>
                                        <div className="flex gap-2 items-center">

                                            <Input id="minPrice" type="number"
                                                placeholder="Min"
                                                value={minPrice}
                                                onChange={e => setMinPrice(e.target.value)}
                                                className="w-full text-black border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors">

                                            </Input>
                                            <span className="text-gray-400">—</span>


                                            <Input id="maxPrice" type="number"
                                                placeholder="Max"
                                                value={maxPrice}
                                                onChange={e => setMaxPrice(e.target.value)}
                                                className="w-full border text-black border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-black transition-colors">

                                            </Input>
                                        </div>
                                    </div>


                                    {hasFilters && (
                                        <Button onClick={resetFilters}
                                            className="w-full border border-gray-300 text-gray-600 py-2 rounded-lg text-sm hover:bg-gray-50 transition-colors">
                                            Reset Filters
                                        </Button>
                                    )}
                                </div>
                            </aside>
                        )
                    }

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