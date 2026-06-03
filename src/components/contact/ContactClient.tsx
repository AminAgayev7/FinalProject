'use client';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type contactFormData, contactSchema } from "@/hooks/zodSchemas";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Link from "next/link";
import Modal from "@/components/ui/Modal";
import Image from "next/image";
export default function ContactPage() {

    const [showModal, setShowModal] = useState(false);

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<contactFormData>({
        resolver: zodResolver(contactSchema),
        defaultValues: { firstName: "", email: "", phone: "", message: "" },
    });

    const onSubmit: SubmitHandler<contactFormData> = (data) => {
        console.log(data);
        setShowModal(true);
        reset();
    };

    return (
        <>
            <form
                method="POST"
                className="w-full"
                onSubmit={handleSubmit(onSubmit)}
            >
                <section className="py-24 bg-white dark:bg-gray-950">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-2xl shadow-lg">
                            <div className="relative">
                                <Image
                                    src="https://images.squarespace-cdn.com/content/v1/6204821bfe06b76898b431c5/80221678-0539-4495-8007-0096677e1eca/image00016.jpeg?format=1000w"
                                    alt="Contact"
                                    className="w-full h-full object-cover"
                                    width={1000}
                                    height={1000}
                                />

                                <div className="absolute inset-0 bg-black/55" />

                                <div className="absolute bottom-0 left-0 w-full p-5 lg:p-10 z-10">
                                    <div className="bg-transparent border border-gray-600 backdrop-blur-2xl rounded-xl p-6 space-y-6 shadow-md">

                                        <div className="flex items-center gap-4">
                                            <div className="text-indigo-600">
                                                <i className="fa-solid text-2xl fa-phone"></i>
                                            </div>
                                            <span className="hover:text-indigo-600 transition">+994 55 293 03 68</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-indigo-600">
                                                <i className="fa-regular text-2xl fa-envelope"></i>
                                            </div>
                                            <Link href="mailto:example@mail.com" className="hover:text-indigo-600 transition">
                                                aminagayev516@gmail.com
                                            </Link>
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-800 p-6 lg:p-12">
                                <h2 className="text-4xl font-bold text-indigo-600 mb-10">
                                    Contact US
                                </h2>

                                <div className="space-y-6">

                                    <div>
                                        <Input
                                            type="text"
                                            id="firstName"
                                            placeholder="Name"
                                            {...register("firstName")}
                                            className="w-full h-12 px-5 rounded-full border dark:text-gray-300 dark:border-gray-600 border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        {errors.firstName && (
                                            <p className="text-red-500 text-sm mt-1 px-5">{errors.firstName.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Input
                                            id="email"
                                            type="email"
                                            placeholder="Email"
                                            {...register("email")}
                                            className="w-full h-12 px-5 rounded-full border dark:text-gray-300 dark:border-gray-600 border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        {errors.email && (
                                            <p className="text-red-500 text-sm mt-1 px-5">{errors.email.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <Input id="phone"
                                            type="text"
                                            placeholder="Phone"
                                            {...register("phone")}
                                            className="w-full h-12 px-5 rounded-full dark:text-gray-300 dark:border-gray-600 border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        {errors.phone && (
                                            <p className="text-red-500 text-sm mt-1 px-5">{errors.phone.message}</p>
                                        )}
                                    </div>

                                    <div>
                                        <textarea
                                            rows={5}
                                            placeholder="Message"
                                            {...register("message")}
                                            className="w-full p-5 rounded-2xl dark:text-gray-300 dark:border-gray-600 border border-gray-300 text-black placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        />
                                        {errors.message && (
                                            <p className="text-red-500 text-sm mt-1 px-5">{errors.message.message}</p>
                                        )}
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full h-12 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-300 disabled:opacity-60"
                                    >
                                        Send Message
                                    </Button>

                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            </form>

            {showModal && (
                <Modal
                    message="We received your message and will comeback you soon!"
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}