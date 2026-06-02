import { useState, useMemo, useEffect } from "react";
import { Product } from "@/types/product";

export function useFilter(products: Product[]) {
    const [selectedSeason, setSelectedSeason] = useState("");
    const seasons = ["Spring", "Summer", "Winter", "All Season"];

    const [search, setSearch] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("default");

    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [debouncedMinPrice, setDebouncedMinPrice] = useState("");
    const [debouncedMaxPrice, setDebouncedMaxPrice] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(search), 400);
        return () => {
            clearTimeout(timer);
        }
    }, [search]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedMinPrice(minPrice), 400);
        return () => {
            clearTimeout(timer);
        }
    }, [minPrice]);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedMaxPrice(maxPrice), 400);
        return () => {
            clearTimeout(timer);
        }
    }, [maxPrice]);

    const handleGenderChange = (gender: string) => {
        setSelectedGender(gender);
        setSelectedCategory("");
    };

    const genders = ["Men", "Women", "Unisex"];

    const categories = useMemo(() => {
        let source;
        if (selectedGender) {
            source = products.filter((product) => {
                return product.gender === selectedGender;
            });
        } else {
            source = products;
        }
        return Array.from(
            new Set(source.map((product) => {
                return product.category;
            }))).sort();
    }, [products, selectedGender]);

    const sizes = useMemo(() => {
        return Array.from(new Set(products.flatMap((product) => {
            return product.sizes;
        })))
    }, [products]);

    const colors = useMemo(() => {
        return Array.from(new Set(products.flatMap((product) => {
            return product.colors
        })))
    }, [products]);

    const filtered = useMemo(() => {
        let result = Array.from(products);

        if (debouncedSearch) {
            result = result.filter((product) => {
                return product.title.toLowerCase().includes(debouncedSearch.toLowerCase());
            });
        }
        if (selectedGender) {
            result = result.filter((product) => {
                return product.gender === selectedGender;
            });
        }
        if (selectedCategory) {
            result = result.filter((product) => {
                return product.category === selectedCategory;
            });
        }
        if (selectedSize) {
            result = result.filter((product) => {
                return product.sizes.includes(selectedSize);
            });
        }
        if (selectedColor) {
            result = result.filter((product) => {
                return product.colors.some((color) => {
                    return color.toLowerCase().includes(selectedColor.toLowerCase())
                })
            });
        }
        if (debouncedMinPrice) {
            result = result.filter((product) => {
                return product.price >= Number(debouncedMinPrice)
            });
        }
        if (debouncedMaxPrice) {
            result = result.filter((product) => {
                return product.price <= Number(debouncedMaxPrice)
            });
        }

        if (sort === "ascending") {
            result.sort((a, b) => {
                return a.price - b.price
            });
        }
        if (sort === "descending") {
            result.sort((a, b) => {
                return b.price - a.price
            });
        }
        if (sort === "rating_descending") {
            result.sort((a, b) => {
                return b.rating - a.rating
            });
        }

        if (selectedSeason) {
            result = result.filter((p) => {
                return p.season === selectedSeason
            });
        }
        return result;
    }, [products, debouncedSearch, selectedGender, selectedCategory, selectedSize, selectedColor, debouncedMinPrice, debouncedMaxPrice, sort, selectedSeason]);

    const resetFilters = () => {
        setSearch("");
        setSelectedGender("");
        setSelectedCategory("");
        setSelectedSize("");
        setSelectedColor("");
        setMinPrice("");
        setMaxPrice("");
        setSort("default");
        setSelectedSeason("");
    };

    const hasFilters = (search || selectedGender || selectedCategory || selectedSize || selectedColor || minPrice || maxPrice || sort !== "default" || selectedSeason);

    return {
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
        selectedSeason, setSelectedSeason, seasons,
    };
}