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
import { useAuth } from "@/hooks/useAuth";
import Modal from "../ui/Modal";
import {storageGet, storageSet} from "@/lib/safeStorage";


export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [product, setProduct] = useState<Product | null>(null);
    const { addToCart, items } = useCart();
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedColor, setSelectedColor] = useState("");
    const [added, setAdded] = useState(false);
    const { isAuthenticated } = useAuth();
    const [showAuthModal, setshowAuthModal] = useState(false);
    const [error, seterror] = useState<string | null>(null);
    useEffect(() => {
        fetchProducts().then((products) => {
            const foundProduct = products.find((p) => {
                return p.id === parseInt(id)
            });
            if (foundProduct) {
                const saved = storageGet(`comments_product_${foundProduct.id}`, null);
                const extra = saved ? JSON.parse(saved) : [];
                setProduct({ ...foundProduct, comments: [...(foundProduct.comments || []), ...extra] });
            }
        }).catch((err) => {
            seterror(`Error fetching product: ${err}`);
        });
    }, [id]);
    
    if (!product) {
        return (
            <div className="min-h-screen bg-zinc-50 pt-20 pb-16 text-black flex items-center justify-center">
                <p className="text-xl text-gray-500">Product not found.</p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="flex flex-col justify-center items-center w-full h-screen dark:bg-gray-950 bg-zinc-50 px-5">
                <h1 className="text-2xl text-red-500">{error}</h1>
                <Button onClick={() => window.location.reload()} className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg transition-colors">
                    Reload Page
                </Button>
            </div>
        )
    }
    const discountedPrice = product.discount ? (product.price - (product.price * product.discount) / 100) : product.price;

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            setshowAuthModal(true);
            return;
        }
        if (!selectedSize || !selectedColor) {
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
            <main className="min-h-screen dark:bg-gray-950 bg-zinc-50 sm:pt-30 pt-25 pb-16 text-black dark:text-white">
                <div className="max-w-7xl mx-auto ">
                    <div className="text-sm text-gray-400 dark:text-gray-500 mb-6">
                        <Link href="/" className="hover:text-black dark:hover:text-white">Home</Link>
                        <span className="mx-2">/</span>
                        <Link href="/products" className="hover:text-black dark:hover:text-white">Products</Link>
                        <span className="mx-2">/</span>
                        <span className="text-gray-700 dark:text-gray-300">{product.title}</span>
                    </div>
                    <div className="rounded-md items-center shadow-lg bg-white dark:bg-gray-900 p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
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
                                            className="w-full h-[400px] sm:h-[500px] md:h-[650px] object-cover rounded-md"
                                            width={300}
                                            height={300}
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="flex flex-col gap-y-3">
                            <div className="flex gap-y-1 flex-col">
                                <p className="text-gray-400 dark:text-gray-500 uppercase tracking-widest text-sm">{product?.brand}</p>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{product?.title}</h1>
                            </div>

                            <div className="flex items-center text-sm gap-x-2">
                                <i className="fa-solid text-amber-400 fa-star"></i>
                                <span className="text-gray-500 dark:text-gray-400">{product?.rating} ({product?.reviews} reviews)</span>
                            </div>
                            <div>
                                {
                                    product.discount ? (
                                        <div className="flex gap-x-3 items-center">
                                            <h1 className="text-2xl font-bold text-black dark:text-white">${discountedPrice.toFixed(2)}</h1>
                                            <span className="text-lg text-gray-500 dark:text-gray-400 line-through">${product?.price}</span>
                                            <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">-{product.discount}%</span>
                                        </div>
                                    ) : (
                                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">${discountedPrice.toFixed(2)}</h1>
                                    )
                                }
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{product?.description}</p>
                            </div>
                            <div className="flex text-sm flex-col gap-y-2">
                                <p className="font-medium text-gray-900 dark:text-white">Material: <span className="font-normal text-gray-500 dark:text-gray-400">{product?.material}</span></p>
                                <p className="font-medium text-gray-900 dark:text-white">Category: <span className="font-normal text-gray-500 dark:text-gray-400">{product?.category}</span></p>
                                <p className="font-medium text-gray-900 dark:text-white">Stock: {product?.stock < 10 ? <span className="text-red-500">{product?.stock}</span> : <span className="text-green-500">{product?.stock}</span>}</p>
                                <p className="font-medium text-gray-900 dark:text-white">Gender: <span className="font-normal text-gray-500 dark:text-gray-400">{product?.gender}</span></p>
                            </div>

                            <div>
                                <h1 className="font-medium text-gray-900 dark:text-white">Size</h1>
                                <div className="flex items-center gap-x-2 flex-wrap mt-2">
                                    {product.sizes.map((size) => (
                                        <Button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${selectedSize === size
                                                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
                                                }`}
                                        >
                                            {size}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col gap-y-2">
                                <h1 className="font-medium text-gray-900 dark:text-white">Color</h1>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map(color => (
                                        <Button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-1.5 rounded border text-sm font-medium transition-colors ${selectedColor === color
                                                ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white"
                                                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-black dark:hover:border-white"
                                                }`}
                                        >
                                            {color}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                            {(!selectedSize || !selectedColor) && (
                                <p className="text-xs text-red-400 mt-3">Please select a size and color.</p>
                            )}

                            <Button
                                onClick={handleAddToCart}
                                disabled={!selectedSize || !selectedColor}
                                className={`mt-6 w-full py-3 rounded font-semibold transition-colors ${added ? "bg-green-600 text-white" : !selectedSize || !selectedColor ? "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500" : "bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200"}`}
                            >
                                {added ? "Successfully added!" : "Add to Cart"}
                            </Button>
                        </div>

                    </div>
                </div>
            </main>
            {product.comments && product.comments.length > 0 && (
                <CommentsSection comments={product.comments} productId={product.id} />
            )}
            {showAuthModal && (
                <Modal
                    message="Please log in to add items to cart!"
                    onClose={() => setshowAuthModal(false)}
                />
            )}

        </>

    );
}