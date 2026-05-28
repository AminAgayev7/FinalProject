"use client";
import { type KeyboardEvent } from "react";
import Input from "./ui/Input";
import { useRouter } from "next/navigation";

type SearchBarProps = {
    search: string;
    setSearch: (v: string) => void;
    onClose?: () => void;
    className?: string;
    inputClassName?: string;
};

export default function SearchBar({ search, setSearch, onClose, className, inputClassName }: SearchBarProps) {
    const router = useRouter();

    function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter" && search.trim() !== "") {
            router.push(`/products?q=${search}`);
            if (onClose) {
                onClose();
            }
        }
    }

    return (
        <div className={`relative ${className}`}>
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                </svg>
            </div>
            <Input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                onKeyDown={handleKeyDown}
                placeholder="Search..."
                className={`pl-9 pr-3 py-2 text-sm rounded-lg outline-none transition-all ${inputClassName}`}
            />
        </div>
    );
}