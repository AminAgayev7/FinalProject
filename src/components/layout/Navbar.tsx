"use client";
import { useState, type KeyboardEvent } from "react";
import Input from "../ui/Input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [search, setSearch] = useState("")
    const router = useRouter();

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key == "Enter") {
            router.push(`/products?q=${search}`)
        }
    }
    return (
        <nav className="fixed w-full z-20 top-0 bg-white border-b border-gray-200 shadow-sm">
            <div className="w-full flex flex-wrap items-center justify-between px-2 sm:px-4 md:px-6 lg:px-8 py-4">


                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <Image
                            width={1000}
                            height={1000}
                            src="/images/newLogo.png"
                            alt="ModeX Logo"
                            className="w-14 h-14  md:w-16 md:h-16 object-cover rounded-full bg-black shadow-md transition-transform duration-300 group-hover:scale-105"
                        />
                    </div>

                    <div className="flex flex-col">
                        <span className="text-2xl font-bold tracking-wide text-black">
                            Mode<span className="text-gray-500">X</span>
                        </span>

                        <span className="text-[10px] uppercase tracking-[4px] text-gray-400 -mt-1">
                            Fashion Store
                        </span>
                    </div>
                </Link>

                <div className="flex items-center gap-2 md:order-2">

                    <div className="relative hidden md:block">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>

                        <Input id="navbar-search" type="text"

                            onChange={(e) => { setSearch(e.target.value) }}
                            value={search}
                            className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Search..." onKeyDown={handleKeyDown}>
                        </Input>
                    </div>


                    <button
                        onClick={() => setOpen(!open)}
                        className="inline-flex items-center justify-center p-2 w-10 h-10 md:hidden text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    >
                        <span className="sr-only">Open the menu</span>
                        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            {open ? (

                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>


                <div className={`w-full md:flex md:w-auto md:items-center md:order-1 transition-all duration-300 ease-in-out ${open ? "block" : "hidden"}`}>


                    <div className="relative mt-4 md:hidden mb-2">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                            </svg>
                        </div>

                        <Input type="text"
                            id="navbar-search"
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            onKeyDown={handleKeyDown}
                            className="block w-full pl-10 pr-3 py-2 text-sm rounded-lg bg-gray-50 border border-gray-300 text-gray-900 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                            placeholder="Search...">
                        </Input>
                    </div>

                    <ul className="flex  flex-col justify-center items-start mt-2 p-4 md:p-0 font-medium border border-gray-100 rounded-lg bg-gray-50 md:flex-row lg:gap-x-15 sm:gap-x-8 md:mt-0 md:border-0 md:bg-white">

                        <Link href="/" className="flex flex-col items-center ">

                            <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">
                                Home
                            </p>
                        </Link>

                        <Link href="/products" className="flex flex-col items-center">

                            <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">
                                Shop
                            </p>
                        </Link>

                        <Link href="/cart" className="flex flex-col items-center">

                            <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">
                                Cart
                            </p>
                        </Link>
                        <Link href="/contact" className="flex flex-col items-center">

                            <p className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-200 md:hover:bg-transparent md:hover:text-blue-600 md:p-0 transition-colors">
                                Contact
                            </p>
                        </Link>
                    </ul>
                </div>
            </div>
        </nav>
    );
}