"use client";

import { Product } from "@/types/product";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar } from "swiper/modules";
import Link from "next/link";
import { useCallback } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Image from "next/image";
import Button from "../ui/Button";
import { useWishlist } from "@/hooks/useWishList";
export default function ProductCard({ product }: { product?: Product }) {
    const { toggleWishlist, wishlist } = useWishlist();
    const handleWishlist = useCallback(() => {
        if (!product) {
            return;
        }
        return toggleWishlist(product);
    }, [toggleWishlist, product]);
    const isFavorite = product ? wishlist.some((item) => item.id === product.id) : false;
    const discountedPrice = product?.discount ? (product.price - (product.price * product.discount) / 100) : product?.price;

    return (
        <div className="relative w-full h-full hover:scale-103 origin-center transition duration-300 rounded-md dark:shadow-blue-950 dark:shadow-lg shadow-lg shadow-gray-300 text-white dark:bg-gray-900 bg-gray-800 flex flex-col overflow-hidden">

            <Swiper
                modules={[Navigation, Pagination, Scrollbar]}
                spaceBetween={10}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                scrollbar={{ draggable: true }}
                className="w-full"
            >
                {product?.images?.map((image, index) => (
                    <SwiperSlide key={index}>
                        <Image
                            src={image}
                            alt={`Product ${index + 1}`}
                            className="h-70 w-full object-cover"
                            width={300}
                            height={300}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            <Button
                onClick={handleWishlist}
                className="absolute top-2 left-2 z-10 text-2xl bg-black/40 rounded-full p-2"
            >
                {isFavorite ? "❤️" : "🤍"}
            </Button>
            <div className="p-4 flex flex-col flex-1">
                <p className="text-xs text-gray-400 uppercase tracking-wide">
                    {product?.brand}
                </p>

                <h2 className="text-base font-semibold  text-gray-100 mt-1 line-clamp-1">
                    {product?.title}
                </h2>

                <div className="flex items-center gap-2 mt-2 flex-wrap">
                    <span className="text-lg font-bold  text-gray-100">
                        ${discountedPrice?.toFixed(2)}
                    </span>

                    {product?.discount ? (
                        <>
                            <span className="text-sm text-gray-400 line-through">
                                ${product.price}
                            </span>

                            <span className="text-xs text-white bg-red-500 px-2 py-0.5 rounded">
                                -{product.discount}%
                            </span>
                        </>
                    ) : null}
                </div>

                <div className="flex items-center gap-1 mt-2 text-sm text-yellow-500">
                    <i className="fa-solid fa-star"></i>

                    <span className="text-gray-500">
                        {product?.rating} ({product?.reviews} reviews)
                    </span>
                </div>

                <p className="mt-2 text-sm text-gray-500 line-clamp-2 min-h-10">
                    {product?.description}
                </p>

                <Link href={`/products/${product?.id}`} className="mt-auto">

                    <Button className="mt-4 w-full bg-black text-white py-2 rounded hover:bg-gray-700 transition-colors">
                        More Information
                    </Button>

                </Link>
            </div>
        </div>
    );
}