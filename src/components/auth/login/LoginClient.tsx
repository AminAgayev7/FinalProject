'use client'
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginFormData, loginSchema } from "@/hooks/zodSchemas";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
    const [showModal, setShowModal] = useState(false);
    const { login } = useAuth();
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors }, } = useForm<loginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: { email: "", password: "" },
    });

    function handleFormSubmit(data: loginFormData) {
        const success = login(data.email, data.password);
        reset();
        if (success) {
            router.push("/");
        } else {
            setShowModal(true);
        }
    }

    return (
        <>
            <div className="flex flex-col justify-center items-center w-full h-screen dark:bg-gray-950 bg-zinc-50 px-5">
                <div className="xl:max-w-3xl w-full p-5 sm:p-10 rounded-md shadow-lg dark:bg-gray-900">
                    <h1 className="text-center text-xl text-black dark:text-white sm:text-3xl font-semibold">
                        Login your account!
                    </h1>
                    <div className="w-full mt-8">
                        <div className="mx-auto max-w-xs sm:max-w-md md:max-w-lg flex flex-col gap-4">
                            <div>
                                <Input
                                    className={"w-full text-gray-700 px-5 dark:bg-gray-800 dark:text-white dark:border-gray-700 py-3 rounded-lg font-medium border-gray-300 border placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline"}
                                    type="email"
                                    {...register("email")}
                                    placeholder="Enter your email"
                                />
                                {errors?.email && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                            <div>
                                <Input
                                    className={"w-full text-gray-700 dark:bg-gray-800 dark:text-white px-5 dark:border-gray-700 py-3 rounded-lg font-medium border-gray-300 border placeholder-gray-500 text-sm focus:outline-none focus:border-2 focus:outline"}
                                    type="password"
                                    {...register("password")}
                                    placeholder="Password"
                                />
                                {errors?.password && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.password.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                type="button"
                                onClick={handleSubmit(handleFormSubmit)}
                                className="mt-5 tracking-wide font-semibold bg-gray-800 text-gray-100 w-full py-4 rounded-lg hover:bg-gray-700 transition-all duration-300 ease-in-out flex items-center justify-center"
                            >
                                <span className="ml-3">Login</span>
                            </Button>

                            <p className="mt-6 text-xs text-gray-600 dark:text-gray-300 text-center">
                                Don't you have an account?{" "}
                                <Link href="/auth/register">
                                    <span className="text-black dark:text-white font-semibold">Register</span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {showModal && (
                <Modal
                    message="Invalid email or password!"
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}