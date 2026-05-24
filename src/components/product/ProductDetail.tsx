'use client';
import { use } from "react";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { fetchProducts } from "@/lib/fetchProducts";
import { useCart } from "@/hooks/useCart";
import Link from "next/link";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import Button from "../ui/Button";
import CommentsSection from "./ProductReviews";
import { getStock } from "@/lib/stockStorage";
export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart, items } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [added, setAdded] = useState(false);

    useEffect(() => {
        fetchProducts().then((products) => {
            const foundProduct = products.find((p) => {
                return p.id === parseInt(id);
            });
            if (foundProduct) {
                setProduct(foundProduct || null);
            }
        });
    }, [id]);

    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-50 pt-20 pb-16 text-black flex items-center justify-center">
                <p className="text-xl text-gray-500">Product not found.</p>
            </div>
        );
    }

    const discountedPrice = product.discount ? (product.price - (product.price * product.discount) / 100) : product.price;

    const handleAddToCart = () => {
        if (!selectedSize || !selectedColor) {
            alert("Please select size and color.");
            return;
        }

        const currentStock = getStock(product.id, product.stock);
        const itemInCart = items.find((item) => {
            return item.product.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
        })

        const currentQuantityInCart = itemInCart ? itemInCart.quantity : 0;

        if (currentQuantityInCart >= currentStock) {
            alert(`Sorry, only ${currentStock} items are available in stock.`);
            return;
        }
        addToCart(product, selectedSize, selectedColor);
        setAdded(true);
        setTimeout(function () {
            setAdded(false);
        }, 2000);
    };




    return (
        <>
            <main className="min-h-screen bg-zinc-50 sm:pt-30 pt-25 pb-16 text-black">
                <div className="max-w-7xl  mx-auto px-6">
                    <div className="text-sm text-gray-400 mb-6">
                        <Link href="/" className="hover:text-black">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/products" className="hover:text-black">Products</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-700">{product.title}</span>
                    </div>
                    <div className="rounded-md shadow-lg p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <Swiper
                                modules={[Navigation, Pagination, Scrollbar]}
                                spaceBetween={10}
                                slidesPerView={1}
                                navigation
                                pagination={{ clickable: true }}
                                scrollbar={{ draggable: true }}
                            >
                                {product?.images?.map((image, index) => (
                                    <SwiperSlide key={index}>
                                        <Image
                                            src={image}
                                            alt={`Product ${index + 1}`}
                                            className="h-129 rounded-md w-full object-cover"
                                            width={300}
                                            height={300}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex gap-y-1 flex-col">
                                <p className="text-gray-400 uppercase tracking-widest text-sm">{product?.brand}</p>
                                <h1 className="text-3xl font-bold">{product?.title}</h1>
                            </div>

                            <div className="flex items-center text-sm gap-x-2">
                                <i className="fa-solid text-amber-400 fa-star"></i><span className="text-gray-500">{product?.rating} ({product?.reviews} reviews)</span>
                            </div>
                            <div>
                                {
                                    product.discount ? (
                                        <div className="flex gap-x-3 items-center">
                                            <h1 className="text-2xl font-bold text-black">${discountedPrice.toFixed(2)}</h1>
                                            <span className="text-lg text-gray-500 line-through">${product?.price}</span>
                                            <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">-{product.discount}%</span>
                                        </div>
                                    ) : (
                                        <h1 className="text-2xl font-bold">${discountedPrice.toFixed(2)}</h1>
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">{product?.description}</p>
                            </div>
                            <div className="flex text-sm flex-col gap-y-2">
                                <p className="font-medium">Material: <span className="font-normal text-gray-500">{product?.material}</span></p>
                                <p className="font-medium">Category: <span className="font-normal text-gray-500">{product?.category}</span></p>
                                <p className="font-medium">Stock: {product?.stock < 10 ? <span className="text-red-500">{product?.stock}</span> : <span className="text-green-500">{product?.stock}</span>}</p>
                                <p className="font-medium">Gender: <span className="font-normal text-gray-500">{product?.gender}</span></p>
                            </div>

                            <div>
                                <h1 className="font-medium">Size</h1>
                                <div className="flex items-center gap-x-2 flex-wrap mt-2">
                                    {product.sizes.map((size) => (
                                        <Button key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${selectedSize === size ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <h1 className="font-medium">Color</h1>
                                <div>
                                    {product.colors.map(color => (

                                        <Button key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${selectedColor === color ? "bg-black text-white border-black" : "bg-white text-gray-700 border-gray-300 hover:border-black"}`}>
                                            {color}
                                        </Button>
                                    ))}
                                </div>

                            </div>
                            {(!selectedSize || !selectedColor) && (
                                <p className="text-xs text-red-400 mt-3">Please select a size and color.</p>
                            )}

                            <Button onClick={handleAddToCart} disabled={!selectedSize || !selectedColor} className={`mt-6 w-full py-3 rounded font-semibold transition-colors ${added ? "bg-green-600 text-white" : !selectedSize || !selectedColor ? "bg-gray-200 text-gray-400" : "bg-black text-white hover:bg-gray-800"}`}>
                                {
                                    added ? "Successfully added!" : "Add to Cart"
                                }
                            </Button>
                        </div>

                    </div>
                </div>
            </main>
            {product.comments && product.comments.length > 0 && (
                <CommentsSection comments={product.comments} />
            )}
        </>

    );
}