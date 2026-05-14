'use client'
import { checkoutSchema } from "@/hooks/zodSchemas";
import { CheckoutFormData } from "@/hooks/zodSchemas";
import { useForm, type SubmitHandler } from "react-hook-form";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
export default function CheckOutPage() {

    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {shipping: {firstName: "", lastName: "", address: "", city: "", state: "", zipCode: ""}, payment: {
            cardNumber: "", cvv: "", expirationDate: ""
        }},
    });

    function onSubmit(data: CheckoutFormData) {

    }
    return (
        <form method="POST" onSubmit={handleSubmit(onSubmit)} className="min-h-screen pt-30 bg-gray-100 py-10">
            <div className="w-full max-w-3xl mx-auto p-4">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">

                    <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                        Checkout
                    </h1>


                    <div className="mb-8">
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                            Shipping Address
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label
                                    htmlFor="first_name"
                                    className="block text-gray-700 dark:text-white mb-1"
                                >
                                    First Name
                                </label>

                                <Input type="text"
                                    id="first_name"
                                    {...register("shipping.firstName")}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"></Input>
                            </div>

                            <div>
                                <label
                                    htmlFor="last_name"
                                    className="block text-gray-700 dark:text-white mb-1"
                                >
                                    Last Name
                                </label>


                                <Input type="text"
                                    id="last_name"
                                    {...register("shipping.lastName")}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500">

                                </Input>
                            </div>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="address"
                                className="block text-gray-700 dark:text-white mb-1"
                            >
                                Address
                            </label>

                            <Input type="text"
                                id="address"
                                {...register("shipping.address")}
                                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500">

                            </Input>
                        </div>

                        <div className="mt-4">
                            <label
                                htmlFor="city"
                                className="block text-gray-700 dark:text-white mb-1"
                            >
                                City
                            </label>

                            <Input type="text"
                                id="city"
                                {...register("shipping.city")}
                                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500">
                                
                            </Input>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label
                                    htmlFor="state"
                                    className="block text-gray-700 dark:text-white mb-1"
                                >
                                    State
                                </label>


                                <Input type="text"
                                    id="state"
                                    {...register("shipping.state")}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"></Input>
                            </div>

                            <div>
                                <label
                                    htmlFor="zip"
                                    className="block text-gray-700 dark:text-white mb-1"
                                >
                                    ZIP Code
                                </label>


                                <Input type="text"
                                    id="zip"
                                    {...register("shipping.zipCode")}
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"></Input>
                            </div>
                        </div>
                    </div>


                    <div>
                        <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">
                            Payment Information
                        </h2>

                        <div>
                            <label
                                htmlFor="card_number"
                                className="block text-gray-700 dark:text-white mb-1"
                            >
                                Card Number
                            </label>


                            <Input type="text"
                                id="card_number"
                                {...register("payment.cardNumber")}
                                className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"></Input>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label
                                    htmlFor="exp_date"
                                    className="block text-gray-700 dark:text-white mb-1"
                                >
                                    Expiration Date
                                </label>


                                <Input type="text"
                                    id="exp_date"
                                    {...register("payment.expirationDate")}
                                    placeholder="MM/YY"
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"></Input>
                            </div>

                            <div>
                                <label
                                    htmlFor="cvv"
                                    className="block text-gray-700 dark:text-white mb-1"
                                >
                                    CVV
                                </label>


                                <Input type="text"
                                {...register("payment.cvv")}
                                    id="cvv"
                                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"></Input>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <Button type="submit" className="bg-teal-500 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition duration-300 dark:bg-teal-600 dark:hover:bg-teal-900">Place Order</Button>
                    </div>

                </div>
            </div>
        </form>
    );
}