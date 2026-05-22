'use client'
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { CheckoutFormData } from "@/hooks/zodSchemas";

export default function UserProfile() {
    const { user, logout } = useAuth();


    const router = useRouter()
    return (
        <div className="bg-zinc-50 min-h-screen flex items-center justify-center p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full p-8 transition-all duration-300 animate-fade-in">
                <div className="flex flex-col md:flex-row">

                    <div className="md:w-1/3 text-center mb-8 md:mb-0">
                        <div
                            className="rounded-full flex items-center justify-center text-5xl bg-linear-to-br from-blue-400 to-purple-500 w-48 h-48 mx-auto mb-4 border-4 border-indigo-800 dark:border-blue-900 transition-transform duration-300 hover:scale-105"
                        >
                            {
                                user?.firstName.charAt(0)
                            }

                        </div>

                        <h1 className="text-2xl font-bold text-indigo-800 dark:text-white mb-2">
                            {
                                user?.firstName
                            }
                        </h1>

                        <p className="text-gray-600 dark:text-gray-300">
                            {
                                user?.email
                            }
                        </p>
                        <div className="flex justify-center">
                            <Button onClick={() => { logout(); router.push("/"); }} className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                                Log Out
                            </Button>
                        </div>

                    </div>


                    <div className="md:w-2/3 md:pl-8">
                    </div>
                </div>
            </div>



        </div>
    );
}