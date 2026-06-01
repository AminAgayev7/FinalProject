'use client'
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Link from "next/link";
import { useState } from "react";
import { registerSchema, registerFormData } from "@/hooks/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import bcrypt from "bcryptjs-react";
import Modal from "@/components/ui/Modal";
import { useRouter } from "next/navigation";
import {storageGet, storageSet} from "@/lib/safeStorage";

export default function RegisterPage() {
    const [showModal, setShowModal] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors },} = useForm<registerFormData>({
        resolver: zodResolver(registerSchema), defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "",},
    });

    function handleFormSubmit(data: registerFormData) {

        const existingUsers = storageGet("data", [] as Omit<registerFormData, "confirmPassword">[]);
        const isUserExist = existingUsers.some((user: { email: string }) => {
            return user.email === data.email
        }
        );

        if (isUserExist) {
            setShowModal(true);
            return;
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);
        existingUsers.push({
            email: data.email,
            password: hashedPassword,
            firstName: data.firstName,
            lastName: data.lastName,
        });
        storageSet("data", existingUsers);
        reset();
        router.push("/auth/login");
    }

    return (
        <>
            <main className="min-h-screen bg-zinc-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
                <div className="w-full  max-w-md">
                    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-6 sm:p-10">
                        <h1 className="text-center text-2xl sm:text-3xl font-bold dark:text-white text-gray-900 mb-8">
                            Register for free!
                        </h1>


                        <div className="flex flex-col gap-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        className={"w-full px-4 py-3 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg font-medium placeholder-gray-400 text-sm dark:bg-gray-800 dark:focus:border-gray-600 focus:outline-none focus:border-gray-500 transition-colors"}
                                        type="text"
                                        {...register("firstName")}
                                        placeholder="First name"
                                    />
                                    {errors?.firstName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.firstName.message}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <Input
                                        className={"w-full px-4 py-3 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg font-medium placeholder-gray-400 text-sm dark:bg-gray-800 dark:focus:border-gray-600 focus:outline-none focus:border-gray-500 transition-colors"}
                                        type="text"
                                        {...register("lastName")}
                                        placeholder="Last name"
                                    />
                                    {errors?.lastName && (
                                        <p className="text-red-500 text-xs mt-1">
                                            {errors.lastName.message}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div>
                                <Input
                                    className={"w-full px-4 py-3 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg font-medium placeholder-gray-400 text-sm dark:bg-gray-800 dark:focus:border-gray-600 focus:outline-none focus:border-gray-500 transition-colors"}
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
                                    className={"w-full px-4 py-3 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg font-medium placeholder-gray-400 text-sm dark:bg-gray-800 dark:focus:border-gray-600 focus:outline-none focus:border-gray-500 transition-colors"}
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

                            <div>
                                <Input
                                    className={"w-full px-4 py-3 dark:text-white text-gray-700 border border-gray-300 dark:border-gray-700 rounded-lg font-medium placeholder-gray-400 text-sm dark:bg-gray-800 dark:focus:border-gray-600 focus:outline-none focus:border-gray-500 transition-colors"}
                                    type="password"
                                    {...register("confirmPassword")}
                                    placeholder="Confirm password"
                                />
                                {errors?.confirmPassword && (
                                    <p className="text-red-500 text-xs mt-1">
                                        {errors.confirmPassword.message}
                                    </p>
                                )}
                            </div>

                            <Button
                                className="mt-2 w-full py-3 bg-gray-800 text-white font-semibold rounded-lg hover:bg-gray-700 transition-colors flex items-center justify-center gap-2"
                                type="button"
                                onClick={handleSubmit(handleFormSubmit)}
                            >
                                Register
                            </Button>

                            <p className="text-xs text-gray-500 dark:text-gray-300 text-center mt-2">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-black dark:text-white font-semibold hover:underline">
                                    Login
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </main>

            {showModal && (
                <Modal
                    message="User already exists!"
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}