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
        <div className="flex shadow-lg p-5 rounded-md relative items-center gap-x-2.5 border dark:border-none dark:bg-gray-800 border-gray-200 bg-white">
            <Link href={link}>
                <Swiper
                    modules={[Pagination]}
                    pagination={{ clickable: true }}
                    slidesPerView={1}
                    className="w-24 h-24 sm:w-35 sm:h-35 rounded-md shrink-0"
                >
                    {item.product.images.map((img, i) => (
                        <SwiperSlide key={i}>

                            <Image src={img} width={1000} height={1000}
                                alt={item.product.title}
                                className="object-cover w-full h-full rounded-md"></Image>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </Link>


            <div className="flex gap-y-1 flex-col flex-1 pr-8">
                <p className="text-gray-400 dark:text-gray-300 text-sm">
                    {item.product.brand}
                </p>

                <h2 className="text-base sm:text-lg dark:text-white text-black font-semibold">
                    {item.product.title}
                </h2>


                <div className="flex flex-wrap gap-x-2">
                    <span className="text-gray-400 dark:text-gray-300 text-sm">
                        Size: {item.selectedSize}
                    </span>

                    <span className="text-gray-400 dark:text-gray-300 text-sm">
                        Color: {item.selectedColor}
                    </span>
                </div>

                <div className="flex gap-x-3 items-center mt-2">

                    <Button className="border dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border-gray-300 rounded-sm px-1.5 text-black hover:bg-gray-100"
                        onClick={() => { updateQuantity(item.product.id, item.selectedSize, item.selectedColor, Math.max(1, item.quantity - 1)) }}>
                        <i className="fa-solid fa-minus text-xs"></i>
                    </Button>

                    <p className="text-black dark:text-gray-300 font-medium">
                        {item.quantity}
                    </p>


                    <Button
                        disabled={item.quantity >= item.product.stock}
                        className="border dark:hover:bg-gray-700 dark:text-gray-300 dark:border-gray-600 border-gray-300 rounded-sm px-1.5 text-black hover:bg-gray-100 disabled:opacity-50"
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
                        <i className="fa-solid fa-plus text-xs"></i>
                    </Button>
                </div>
            </div>

            <div className="text-sm sm:text-lg absolute bottom-5 right-5 text-right">
                <p className="text-gray-800 dark:text-gray-300 font-bold">
                    $
                    {item.product.discount ? ((item.product.price - (item.product.price * item.product.discount) / 100) * item.quantity
                    ).toFixed(2) : (item.product.price * item.quantity).toFixed(2)}
                </p>

                {item.product.discount ? (
                    <p className="text-gray-400 dark:text-gray-300 line-through text-xs">
                        ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                ) : null}
            </div>



            <Button className="absolute top-5 right-5 text-gray-400 hover:text-red-500 transition-colors"
                onClick={() => {
                    removeFromCart(
                        item.product.id,
                        item.selectedSize,
                        item.selectedColor
                    )
                }
                }>
                <i className="fa-solid fa-xmark"></i>
            </Button>
        </div>
    );
}