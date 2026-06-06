"use client";

import type { CartItem } from "@/context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/pagination";
import Button from "../ui/Button";
import Link from "next/link";

type CartItemProps = {
    item: CartItem;
    removeFromCart: (id: number, size: string, color: string) => void;
    updateQuantity: (id: number, size: string, color: string, quantity: number, stock?: number) => void;
    link: string;
};

export default function CartItem({ item, removeFromCart, updateQuantity, link }: CartItemProps) {
    return (
        <div className="flex shadow-lg p-3 sm:p-5 rounded-md relative items-start sm:items-center gap-x-3 sm:gap-x-4 border dark:border-none dark:bg-gray-800 border-gray-200 bg-white min-h-[130px] sm:min-h-0">
            <Link href={link} className="shrink-0">
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    className="w-25 h-25 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-md shrink-0"
                >
                    {item.product.images.map((img, i) => (
                        <SwiperSlide key={i}>
                            <Image
                                src={img}
                                width={1000}
                                height={1000}
                                alt={item.product.title}
                                className="object-cover w-full h-full rounded-md"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Link>

            <div className="flex flex-col flex-1 pr-6 sm:pr-8 gap-y-1 w-full">
                <p className="text-gray-400 dark:text-gray-300 text-xs sm:text-sm">
                    {item.product.brand}
                </p>

                <h2 className="text-sm sm:text-base md:text-lg dark:text-white text-black font-semibold line-clamp-2 pr-2 sm:pr-0">
                    {item.product.title}
                </h2>

                <div className="flex flex-wrap gap-x-2 sm:gap-x-3">
                    <span className="text-gray-400 dark:text-gray-300 text-xs sm:text-sm">
                        Size: {item.selectedSize}
                    </span>
                    <span className="text-gray-400 dark:text-gray-300 text-xs sm:text-sm">
                        Color: {item.selectedColor}
                    </span>
                </div>

                <div className="flex gap-x-2 sm:gap-x-3 items-center mt-1 sm:mt-2 mb-6 sm:mb-0">
                    <Button
                        className="border dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border-gray-300 rounded-sm px-1.5 py-0.5 sm:px-2 sm:py-1 text-black hover:bg-gray-100 flex items-center justify-center transition-colors"
                        onClick={() => { updateQuantity(item.product.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1)) }}
                    >
                        <i className="fa-solid fa-minus text-[10px] sm:text-xs"></i>
                    </Button>

                    <p className="text-black dark:text-gray-300 font-medium text-sm sm:text-base w-4 text-center">
                        {item.quantity}
                    </p>

                    <Button
                        disabled={item.quantity >= item.product.stock}
                        className="border dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border-gray-300 rounded-sm px-1.5 py-0.5 sm:px-2 sm:py-1 text-black hover:bg-gray-100 disabled:opacity-50 flex items-center justify-center transition-colors"
                        onClick={() => {
                            updateQuantity(
                                item.product.id,
                                item.selectedSize,
                                item.selectedColor,
                                item.quantity + 1,
                                item.product.stock
                            );
                        }}
                    >
                        <i className="fa-solid fa-plus text-[10px] sm:text-xs"></i>
                    </Button>
                </div>
            </div>

            <div className="flex flex-col items-end absolute bottom-3 right-3 sm:bottom-5 sm:right-5">
                <p className="text-sm sm:text-lg text-gray-800 dark:text-gray-300 font-bold leading-none">
                    $
                    {item.product.discount ? ((item.product.price - (item.product.price * item.product.discount) / 100) * item.quantity).toFixed(2) : (item.product.price * item.quantity).toFixed(2)}
                </p>

                {item.product.discount > 0 && (
                    <p className="text-gray-400 dark:text-gray-300 line-through text-[10px] sm:text-xs mt-1">
                        ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                )}
            </div>

            <Button
                className="absolute top-3 right-3 sm:top-5 sm:right-5 text-gray-400 hover:text-red-500 transition-colors p-1"
                onClick={() => {
                    removeFromCart(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor
                    )
                }}
            >
                <i className="fa-solid fa-xmark text-sm sm:text-base"></i>
            </Button>
        </div>
    );
}