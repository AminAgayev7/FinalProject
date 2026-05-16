'use client';
import { useForm, type SubmitHandler } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { type contactFormData, contactSchema } from "@/hooks/zodSchemas";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
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
                <section className="py-24 bg-white">
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
                                                <svg width="28" height="28" fill="none" viewBox="0 0 30 30">
                                                    <path
                                                        d="M22.3092 18.3098C22.0157 18.198 21.8689 18.1421 21.7145 18.1287C21.56 18.1154 21.4058 18.1453 21.0975 18.205L17.8126 18.8416C17.4392 18.9139 17.2525 18.9501 17.0616 18.9206C16.8707 18.891 16.7141 18.8058 16.4008 18.6353C13.8644 17.2551 12.1853 15.6617 11.1192 13.3695C10.9964 13.1055 10.935 12.9735 10.9133 12.8017C10.8917 12.6298 10.9218 12.4684 10.982 12.1456L11.6196 8.72559C11.6759 8.42342 11.7041 8.27233 11.6908 8.12115C11.6775 7.96998 11.6234 7.82612 11.5153 7.5384L10.6314 5.18758C10.37 4.49217 10.2392 4.14447 9.95437 3.94723C9.6695 3.75 9.29804 3.75 8.5551 3.75H5.85778C4.58478 3.75 3.58264 4.8018 3.77336 6.06012C4.24735 9.20085 5.64674 14.8966 9.73544 18.9853C14.0295 23.2794 20.2151 25.1426 23.6187 25.884C24.9335 26.1696 26.0993 25.1448 26.0993 23.7985V21.2824C26.0993 20.5428 26.0993 20.173 25.9034 19.8888C25.7076 19.6046 25.362 19.4729 24.6708 19.2096L22.3092 18.3098Z"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="hover:text-indigo-600 transition">+994 55 293 03 68</span>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-indigo-600">
                                                <svg width="28" height="28" fill="none" viewBox="0 0 30 30">
                                                    <path
                                                        d="M2.81501 8.75L10.1985 13.6191C12.8358 15.2015 14.1544 15.9927 15.6032 15.9582C17.0519 15.9237 18.3315 15.0707 20.8905 13.3647L27.185 8.75M12.5 25H17.5C22.214 25 24.5711 25 26.0355 23.5355C27.5 22.0711 27.5 19.714 27.5 15C27.5 10.286 27.5 7.92893 26.0355 6.46447C24.5711 5 22.214 5 17.5 5H12.5C7.78595 5 5.42893 5 3.96447 6.46447C2.5 7.92893 2.5 10.286 2.5 15C2.5 19.714 2.5 22.0711 3.96447 23.5355C5.42893 25 7.78595 25 12.5 25Z"
                                                        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                                    />
                                                </svg>
                                            </div>
                                            <a href="mailto:example@mail.com" className="hover:text-indigo-600 transition">
                                                aminagayev516@gmail.com
                                            </a>
                                        </div>

                                        <div className="flex items-center gap-4">
                                            <div className="text-indigo-600">
                                                <svg width="28" height="28" fill="none" viewBox="0 0 30 30">
                                                    <path
                                                        d="M25 12.9169C25 17.716 21.1939 21.5832 18.2779 24.9828C16.8385 26.6609 16.1188 27.5 15 27.5C13.8812 27.5 13.1615 26.6609 11.7221 24.9828C8.80612 21.5832 5 17.716 5 12.9169C5 10.1542 6.05357 7.5046 7.92893 5.55105C9.8043 3.59749 12.3478 2.5 15 2.5C17.6522 2.5 20.1957 3.59749 22.0711 5.55105C23.9464 7.5046 25 10.1542 25 12.9169Z"
                                                        stroke="currentColor" strokeWidth="2"
                                                    />
                                                    <path
                                                        d="M17.5 11.6148C17.5 13.0531 16.3807 14.219 15 14.219C13.6193 14.219 12.5 13.0531 12.5 11.6148C12.5 10.1765 13.6193 9.01058 15 9.01058C16.3807 9.01058 17.5 10.1765 17.5 11.6148Z"
                                                        stroke="currentColor" strokeWidth="2"
                                                    />
                                                </svg>
                                            </div>
                                            <span className="hover:text-indigo-600 transition">
                                                654 Sycamore Avenue, Meadowville, WA 76543
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-50 p-6 lg:p-12">
                                <h2 className="text-4xl font-bold text-indigo-600 mb-10">
                                    Send Us A Message
                                </h2>

                                <div className="space-y-6">

                                    <div>
                                        <Input
                                            type="text"
                                            id="firstName"
                                            placeholder="Name"
                                            {...register("firstName")}
                                            className="w-full h-12 px-5 rounded-full border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                            className="w-full h-12 px-5 rounded-full border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                            className="w-full h-12 px-5 rounded-full border border-gray-300 text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                                            className="w-full p-5 rounded-2xl border border-gray-300 text-black placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
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