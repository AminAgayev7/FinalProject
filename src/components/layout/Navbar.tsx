"use client";

import { useEffect, useState} from "react";


import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import SearchBar from "../SearchBar";
import ThemeToggle from "../theme/ThemeToggle";
import { usePathname } from "next/navigation";
export default function Navbar() {

    const { user } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");


    const pathname = usePathname();
    useEffect(() => {
        if (user) {
            const savedImage = localStorage.getItem(
                `profileImage_${user.email}`
            );

            if (savedImage) {
                setProfileImage(savedImage);
            }
        }
    }, [user]);


    return (

        <nav className="fixed dark:bg-gray-900 top-0 left-0 w-full py-3 sm:py-4 px-3 sm:px-6 lg:px-8 z-50 backdrop-blur-md bg-white/90   transition-all duration-300">

            <div className="flex justify-between items-center gap-3 w-full">

                <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 sm:gap-3 group shrink-0"
                >

                    <div className="relative">

                        <Image
                            width={44}
                            height={44}
                            src="/images/newLogo.png"
                            alt="ModeX Logo"
                            className="w-9 h-9 sm:w-11 sm:h-11  object-cover rounded-full bg-black shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />

                    </div>

                    <div className="flex flex-col leading-none">

                        <span className="text-lg sm:text-xl dark:text-white font-bold tracking-wide text-gray-900">
                            Mode
                            <span className="text-gray-500">
                                X
                            </span>
                        </span>

                        <span className="text-[8px] sm:text-[9px] uppercase tracking-[3px] sm:tracking-[4px] dark:text-gray-300 text-gray-400 mt-0.5">
                            Fashion Store
                        </span>

                    </div>

                </Link>

                <ul className="hidden md:flex items-center gap-6 lg:gap-8 list-none m-0 p-0">
                    <li>
                        <Link
                            href="/"
                            className={`relative group text-sm font-medium transition-colors pb-0.5 ${pathname === "/" ? "text-blue-500" : "text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"}`}
                        >
                            Home

                            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 transition-all duration-300 rounded-full ${pathname === "/" ? "w-full" : "w-0 group-hover:w-full"}`}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/products"
                            className={`relative group text-sm font-medium transition-colors pb-0.5 ${pathname === "/products" ? "text-blue-500" : "text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"}`}
                        >
                            Shop

                            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 transition-all duration-300 rounded-full ${pathname === "/products" ? "w-full" : "w-0 group-hover:w-full"}`}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/cart"
                            className={`relative group text-sm font-medium transition-colors pb-0.5 ${pathname === "/cart" ? "text-blue-500" : "text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"}`}
                        >
                            Cart

                            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 transition-all duration-300 rounded-full ${pathname === "/cart" ? "w-full" : "w-0 group-hover:w-full"}`}
                            />
                        </Link>
                    </li>

                    <li>
                        <Link
                            href="/contact"
                            className={`relative group text-sm font-medium transition-colors pb-0.5 ${pathname === "/contact" ? "text-blue-500" : "text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"}`}
                        >
                            Contact

                            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 transition-all duration-300 rounded-full ${pathname === "/contact" ? "w-full" : "w-0 group-hover:w-full"}`}
                            />
                        </Link>
                    </li>
                    <li>
                        <Link
                            href="/wishlist"
                            className={`relative group text-sm font-medium transition-colors pb-0.5 ${pathname === "/wishlist" ? "text-blue-500" : "text-gray-500 hover:text-gray-900 dark:text-white dark:hover:text-gray-300"}`}
                        >
                            Wishlist

                            <span className={`absolute bottom-0 left-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 transition-all duration-300 rounded-full ${pathname === "/wishlist" ? "w-full" : "w-0 group-hover:w-full"}`}
                            />
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        className="hidden md:block w-40 lg:w-48"
                        inputClassName="w-full dark:bg-gray-800 dark:border-none border-gray-300 border dark:text-white bg-gray-50 text-gray-900"
                    />
                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link
                                href="/profile"
                                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg  dark:hover:bg-gray-800 hover:bg-gray-100 transition-colors group"
                            >
                                <div className="w-7 h-7 rounded-full overflow-hidden shrink-0">
                                    {
                                        profileImage ? (
                                            <Image
                                                width={28}
                                                height={28}
                                                src={profileImage}
                                                alt="Profile"
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                <span className="text-white text-xs font-semibold">
                                                    {user.firstName.charAt(0).toUpperCase()}
                                                </span>
                                            </div>
                                        )
                                    }
                                </div>

                                <span className="text-sm dark:text-white   text-gray-700 font-medium  transition-colors hidden lg:block">
                                    {user.firstName}
                                </span>
                            </Link>


                        </div>

                    ) : (
                        <div className="hidden md:flex items-center gap-2">
                            <Link
                                href="/auth/login"
                                className="px-3 lg:px-4 py-2 dark:hover:bg-gray-800  dark:text-white text-sm border-gray-400 dark:border-gray-500 text-gray-600 border rounded-lg hover:bg-gray-200  transition-all"
                            >
                                Login
                            </Link>

                            <Link
                                href="/auth/register"
                                className="px-3 lg:px-4 py-2 text-sm text-white rounded-lg bg-linear-to-r from-blue-400 to-purple-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                            >
                                Register
                            </Link>
                        </div>

                    )}
                    <Button
                        onClick={() => setOpen(!open)}
                        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                        <span className="sr-only">Open the menu</span>

                        <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-gray-700 dark:bg-gray-300 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                    </Button>
                    <ThemeToggle />
                </div>

            </div>

            <div
                className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-125 opacity-100" : "max-h-0 opacity-0"}`}
            >

                <div className="pt-4  mt-3 flex flex-col gap-1">

                    <SearchBar
                        search={search}
                        setSearch={setSearch}
                        onClose={() => setOpen(false)}
                        className="mb-3 w-full"
                        inputClassName="w-full bg-gray-50 border border-gray-200 dark:bg-gray-800 dark:border-none dark:text-white text-gray-900 focus:ring-2 focus:ring-blue-200"
                    />

                    <Link
                        href="/"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2.5 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-800 text-sm font-medium text-gray-700 rounded-lg  transition-colors"
                    >
                        Home
                    </Link>

                    <Link
                        href="/products"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2.5 text-sm font-medium hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white  text-gray-700 rounded-lg  transition-colors"
                    >
                        Shop
                    </Link>

                    <Link
                        href="/cart"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2.5 text-sm hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white  font-medium text-gray-700 rounded-lg  transition-colors"
                    >
                        Cart
                    </Link>

                    <Link
                        href="/contact"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2.5 text-sm hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white font-medium text-gray-700 rounded-lg transition-colors"
                    >
                        Contact
                    </Link>
                    <Link
                        href="/wishlist"
                        onClick={() => setOpen(false)}
                        className="px-3 py-2.5 text-sm hover:bg-gray-300 dark:hover:bg-gray-800 dark:text-white font-medium text-gray-700 rounded-lg  transition-colors"
                    >
                        Wishlist
                    </Link>
                    <div className="mt-2 mb-1 border-t border-gray-400 pt-3">
                        {user ? (
                            <div className="flex items-center justify-between px-3 py-2">
                                <Link
                                    href="/profile"
                                    onClick={() => setOpen(false)}
                                    className="flex items-center gap-2"
                                >
                                    <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                                        {
                                            profileImage ? (
                                                <img
                                                    src={profileImage}
                                                    alt="Profile"
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                    <span className="text-white text-xs font-semibold">
                                                        {user.firstName.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            )
                                        }
                                    </div>

                                    <span className="text-sm dark:text-white text-gray-700 font-medium">
                                        {user.firstName}
                                    </span>

                                </Link>

                            </div>

                        ) : (

                            <div className="flex gap-2 sm:gap-3 px-1">

                                <Link
                                    href="/auth/login"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 text-center px-2 sm:px-4 py-2.5 text-sm text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all font-medium"
                                >
                                    Login
                                </Link>

                                <Link
                                    href="/auth/register"
                                    onClick={() => setOpen(false)}
                                    className="flex-1 text-center px-2 sm:px-4 py-2.5 text-sm text-white rounded-lg bg-linear-to-r from-blue-400 to-purple-500 font-semibold hover:shadow-md transition-all"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}