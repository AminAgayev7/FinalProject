"use client";
import Button from "./ui/Button";
import Input from "./ui/Input";

type FilterPanelProps = {
    search: string;
    setSearch: (v: string) => void;
    selectedSeason: string;
    setSelectedSeason: (v: string) => void;
    seasons: string[];
    selectedGender: string;
    handleGenderChange: (v: string) => void;
    genders: string[];
    selectedCategory: string;
    setSelectedCategory: (v: string) => void;
    categories: string[];
    selectedSize: string;
    setSelectedSize: (v: string) => void;
    sizes: string[];
    selectedColors: string[];
    toggleColor: (v: string) => void;
    colors: string[];
    minPrice: string;
    setMinPrice: (v: string) => void;
    maxPrice: string;
    setMaxPrice: (v: string) => void;
    resetFilters: () => void;
    hasFilters: string | boolean;
};

export default function FilterPanel({ search, setSearch, selectedSeason, setSelectedSeason, seasons, selectedGender, handleGenderChange, genders, selectedCategory, setSelectedCategory, categories, selectedSize, setSelectedSize, sizes, selectedColors, toggleColor, colors, minPrice, setMinPrice, maxPrice, setMaxPrice, resetFilters, hasFilters }: FilterPanelProps) {

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 sticky top-24 flex flex-col gap-6">

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2" htmlFor="search">Search</label>
                <Input
                    id="search"
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full border dark:text-gray-300 border-gray-300 rounded-lg text-black px-3 py-2 text-sm focus:outline-none dark:border-gray-600 focus:border-gray-300 transition-colors"
                />
            </div>

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2">Season</label>
                <div className="flex flex-col gap-1">
                    {seasons.map((season) => (
                        <Button
                            key={season}
                            onClick={() => setSelectedSeason(selectedSeason === season ? "" : season)}
                            className={`text-left dark:text-gray-300 px-3 py-2 rounded-lg text-sm transition-colors ${selectedSeason === season ? "bg-black text-white" : "text-gray-600 dark:hover:bg-gray-600 hover:bg-gray-100"}`}
                        >
                            {season}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2">Gender</label>
                <div className="flex flex-col gap-1">
                    {genders.map((gender) => (
                        <Button
                            key={gender}
                            onClick={() => handleGenderChange(selectedGender === gender ? "" : gender)}
                            className={`text-left px-3 dark:text-gray-300 py-2 rounded-lg text-sm transition-colors ${selectedGender === gender ? "bg-black text-white" : "text-gray-600 dark:hover:bg-gray-600 hover:bg-gray-100"}`}
                        >
                            {gender}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2">Category</label>
                <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setSelectedCategory(selectedCategory === category ? "" : category)}
                            className={`text-left px-3 dark:text-gray-300 py-2 rounded-lg text-sm transition-colors ${selectedCategory === category ? "bg-black text-white" : "text-gray-600 dark:hover:bg-gray-600 hover:bg-gray-100"}`}
                        >
                            {category}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2">Size</label>
                <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                        <Button
                            key={size}
                            onClick={() => setSelectedSize(selectedSize === size ? "" : size)}
                            className={`px-3 py-1 rounded border text-xs font-medium transition-colors ${selectedSize === size
                                ? "bg-black text-white border-black"
                                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
                                }`}
                        >
                            {size}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2">Color</label>
                <div className="flex flex-wrap gap-2">
                    {colors.map((color) => (
                        <Button
                            key={color}
                            onClick={() => toggleColor(color)}
                            className={`px-3 py-1 rounded border text-xs font-medium transition-colors ${selectedColors.includes(color)
                                    ? "bg-black text-white border-black"
                                    : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
                                }`}
                        >
                            {color}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <label className="font-semibold dark:text-gray-300 text-gray-700 block mb-2">Price Range</label>
                <div className="flex gap-2 items-center">
                    <Input
                        id="minPrice"
                        type="number"
                        placeholder="Min"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="w-full text-black dark:text-gray-300 border border-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-300 transition-colors"
                    />
                    <span className="text-gray-400">—</span>
                    <Input
                        id="maxPrice"
                        type="number"
                        placeholder="Max"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="w-full border text-black dark:text-gray-300 border-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-gray-300 transition-colors"
                    />
                </div>
            </div>

            {hasFilters && (
                <Button
                    onClick={resetFilters}
                    className="w-full bg-gray-900 text-gray-300 hover:bg-gray-700 py-2 rounded-lg text-sm transition-colors"
                >
                    Reset Filters
                </Button>
            )}
        </div>
    );
}