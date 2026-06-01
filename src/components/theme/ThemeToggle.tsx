"use client";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import {storageGet, storageSet} from "@/lib/safeStorage";
export default function ThemeToggle() {
    const [isDark, setIsDark] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const saved = storageGet("theme", null);
        const dark = saved ? saved === "dark" : true;
        setIsDark(dark);
        if (dark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, []);

    useEffect(() => {
        if (!mounted) {
                return;
            }
        if (isDark) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        storageSet("theme", isDark ? "dark" : "light");
    }, [isDark, mounted]);

    if (!mounted) {
        return <div className="w-9 h-9" />;
    }

    return (
        <Button
            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white border-gray-400 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 text-2xl rounded-full p-1 border transition-colors"
            onClick={() => setIsDark(!isDark)}
        >
            {isDark ? <i className="fa-regular fa-lightbulb"></i> : <i className="fa-solid fa-lightbulb"></i>}
        </Button>
    );
}