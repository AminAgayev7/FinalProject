"use client";
import { useState, type KeyboardEvent } from "react";
import Input from "../ui/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../ui/Button";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";

export default function Navbar() {
    const { user, logout } = useAuth();
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("");
    const router = useRouter();

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            router.push(`/products?q=${search}`);
        }
    }

    function handleLogout() {
        logout();
        router.push("/");
    }

    return (
        <nav className="fixed top-0 left-0 w-full py-5 px-3 sm:px-4 z-50 backdrop-blur-md bg-white/80 border-b border-gray-100 transition-all duration-300">
            <div className="flex justify-between items-center gap-4">

                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <div className="relative">
                        <Image
                            width={44}
                            height={44}
                            src="/images/newLogo.png"
                            alt="ModeX Logo"
                            className="w-11 h-11 object-cover rounded-full bg-black shadow-sm transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>
                    <div className="flex flex-col leading-none">
                        <span className="text-xl font-bold tracking-wide text-gray-900">
                            Mode<span className="text-gray-500">X</span>
                        </span>
                        <span className="text-[9px] uppercase tracking-[4px] text-gray-400 mt-0.5">
                            Fashion Store
                        </span>
                    </div>
                </Link>

                <ul className="hidden lg:flex items-center gap-8 list-none m-0 p-0">
                    <li>
                        <Link href="/" className="relative group text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors pb-0.5">
                            Home
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/products" className="relative group text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors pb-0.5">
                            Shop
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/cart" className="relative group text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors pb-0.5">
                            Cart
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
                        </Link>
                    </li>
                    <li>
                        <Link href="/contact" className="relative group text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors pb-0.5">
                            Contact
                            <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-linear-to-r from-blue-400 to-purple-500 group-hover:w-full transition-all duration-300 rounded-full" />
                        </Link>
                    </li>
                </ul>

                <div className="flex items-center gap-3 shrink-0">

                    <div className="relative hidden lg:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <Input
                            id="navbar-search-desktop"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            onKeyDown={handleKeyDown}
                            className="w-44 pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none transition-all"
                            placeholder="Search..."
                        />
                    </div>

                    {user ? (
                        <div className="flex items-center gap-2">
                            <Link href="/profile" className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors group">
                                <div className="w-7 h-7 rounded-full bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                                    <span className="text-white text-xs font-semibold">
                                        {user.firstName.charAt(0).toUpperCase()}
                                    </span>
                                </div>
                                <span className="text-sm text-gray-700 font-medium group-hover:text-gray-900 transition-colors">
                                    {user.firstName}
                                </span>
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="p-2 rounded-lg text-red-400 hover:bg-red-50 transition-colors"
                                title="Logout"
                            >
                                <i className="fa-solid fa-arrow-right-from-bracket" />
                            </button>
                        </div>
                    ) : (
                        <div className="hidden lg:flex items-center gap-2">
                            <Link
                                href="/auth/login"
                                className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-all"
                            >
                                Login
                            </Link>
                            <Link
                                href="/auth/register"
                                className="px-4 py-2 text-sm text-white rounded-lg bg-linear-to-r from-blue-400 to-purple-500 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 font-semibold"
                            >
                                Register
                            </Link>
                        </div>
                    )}

                    <Button
                        onClick={() => setOpen(!open)}
                        className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <span className="sr-only">Open the menu</span>
                        <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${open ? "rotate-45 translate-y-2" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${open ? "opacity-0" : ""}`} />
                        <span className={`block w-5 h-0.5 bg-gray-700 rounded transition-all duration-300 ${open ? "-rotate-45 -translate-y-2" : ""}`} />
                    </Button>
                </div>
            </div>

            <div className={`lg:hidden transition-all duration-300 ease-in-out overflow-hidden ${open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}>
                <div className="pt-4 border-t border-gray-100 mt-4 flex flex-col gap-1">

                    <div className="relative mb-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>
                        <Input
                            id="navbar-search-mobile"
                            type="text"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            onKeyDown={handleKeyDown}
                            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-200 text-gray-900 focus:ring-2 focus:ring-blue-200 focus:border-blue-300 outline-none transition-all"
                            placeholder="Search..."
                        />
                    </div>

                    <Link href="/" className="px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        Home
                    </Link>
                    <Link href="/products" className="px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        Shop
                    </Link>
                    <Link href="/cart" className="px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        Cart
                    </Link>
                    <Link href="/contact" className="px-3 py-2.5 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-50 hover:text-gray-900 transition-colors">
                        Contact
                    </Link>

                    {user ? (
                        <div className="flex items-center justify-between px-3 py-2.5">
                            <span className="text-sm text-gray-600 font-medium">Salam, {user.firstName}</span>
                            <button onClick={handleLogout} className="text-sm text-red-400 hover:underline">
                                <i className="fa-solid fa-arrow-right-from-bracket" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex gap-2 pt-2 pb-1">
                            <Link href="/auth/login" className="flex-1 text-center px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                                Login
                            </Link>
                            <Link href="/auth/register" className="flex-1 text-center px-4 py-2 text-sm text-white rounded-lg bg-linear-to-r from-blue-400 to-purple-500 font-semibold hover:shadow-md transition-all">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}