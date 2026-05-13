
import { useState, useMemo } from "react";
import { Product } from "@/types/product";

export function useFilter(products: Product[]) {
    const [search, setSearch] = useState("");
    const [selectedGender, setSelectedGender] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [sort, setSort] = useState("default");

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

        if (search) {
            result = result.filter((product) => {
                return product.title.toLowerCase().includes(search.toLowerCase());
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
        if (minPrice) {
            result = result.filter((product) => {
                return product.price >= Number(minPrice)
            });
        }
        if (maxPrice) {
            result = result.filter((product) => {
                return product.price <= Number(maxPrice)
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

        return result;
    }, [products, search, selectedGender, selectedCategory, selectedSize, selectedColor, minPrice, maxPrice, sort]);

    const resetFilters = () => {
        setSearch("");
        setSelectedGender("");
        setSelectedCategory("");
        setSelectedSize("");
        setSelectedColor("");
        setMinPrice("");
        setMaxPrice("");
        setSort("default");
    };

    const hasFilters = (search || selectedGender || selectedCategory || selectedSize || selectedColor || minPrice || maxPrice || sort !== "default");

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
    };
}