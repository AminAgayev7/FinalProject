'use client'
import { checkoutSchema, CheckoutFormData } from "@/hooks/zodSchemas";
import { useForm } from "react-hook-form";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Button from "@/components/ui/Button";
import { useCart } from "@/hooks/useCart";
import { useState, useEffect } from "react";
import Modal from "@/components/ui/Modal";
import { useAuth } from "@/hooks/useAuth";
import { getCards, deductBalance } from "@/lib/cardStorage";
import { Card } from "@/types/card";
import Link from "next/link";
import { getStock } from "@/lib/stockStorage";
import { useRouter } from "next/navigation";
import { deductStock } from "@/lib/stockStorage";

export default function CheckOutPage() {
    const { totalPrice, clearCart, items } = useCart();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    const [orderedTotal, setOrderedTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCardId, setSelectedCardId] = useState("");
    const [cardError, setCardError] = useState("");

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
            return;
        }
        if (user) {
            const userCards = getCards(user.email);
            setCards(userCards);
            if (userCards.length > 0) {
                setSelectedCardId(userCards[0].id);
            }
        }
    }, [isAuthenticated, user]);

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CheckoutFormData>({
        resolver: zodResolver(checkoutSchema),
        defaultValues: {
            shipping: { firstName: "", lastName: "", address: "", city: "", state: "", zipCode: "" },
        },
    });

    function onSubmit(data: CheckoutFormData) {
        if (!selectedCardId) {
            setCardError("Please select a payment card.");
            return;
        }

        const selectedCard = cards.find((c) => {
            return c.id === selectedCardId
        });
        if (!selectedCard) {
            setCardError("Selected card not found."); 
            return; 
        }
        if (selectedCard.balance < totalPrice) { 
            setCardError(`Insufficient balance. Card balance: $${selectedCard.balance.toFixed(2)}`); 
            return; 
        }

        items.forEach((item) => {
            const currentStock = getStock(item.product.id, item.product.stock);
            deductStock(item.product.id, currentStock, item.quantity)
        })
        deductBalance(user!.email, selectedCardId, totalPrice);
        setOrderedTotal(totalPrice);
        clearCart();
        reset();
        setShowModal(true);


        setCards(getCards(user!.email));
    }

    if (items.length === 0 && !showModal) {
        return (
            <main className="min-h-screen bg-zinc-50 pt-24 flex flex-col items-center justify-center gap-4">
                <p className="text-5xl">🛒</p>
                <h2 className="text-2xl font-bold text-gray-800">Your cart is empty</h2>
                <Link href="/products">
                    <button className="mt-4 bg-black text-white px-8 py-3 rounded font-semibold hover:bg-gray-800 transition-colors">
                        Continue Shopping
                    </button>
                </Link>
            </main>
        );
    }

 

    return (
        <>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="min-h-screen pt-30 bg-gray-100 py-10">
                <div className="w-full max-w-3xl mx-auto p-4">
                    <div className="bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-lg shadow-md border dark:border-gray-700">

                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Checkout</h1>


                        <div className="mb-8">
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Shipping Address</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="first_name" className={"block text-gray-700 dark:text-white mb-1"}>First Name</label>
                                    <Input type="text" id="first_name" {...register("shipping.firstName")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                    {errors.shipping?.firstName && <p className="text-red-500 text-sm mt-1">{errors.shipping.firstName.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="last_name" className={"block text-gray-700 dark:text-white mb-1"}>Last Name</label>
                                    <Input type="text" id="last_name" {...register("shipping.lastName")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                    {errors.shipping?.lastName && <p className="text-red-500 text-sm mt-1">{errors.shipping.lastName.message}</p>}
                                </div>
                            </div>

                            <div className="mt-4">
                                <label htmlFor="address" className={"block text-gray-700 dark:text-white mb-1"}>Address</label>
                                <Input type="text" id="address" {...register("shipping.address")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                {errors.shipping?.address && <p className="text-red-500 text-sm mt-1">{errors.shipping.address.message}</p>}
                            </div>

                            <div className="mt-4">
                                <label htmlFor="city" className={"block text-gray-700 dark:text-white mb-1"}>City</label>
                                <Input type="text" id="city" {...register("shipping.city")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                {errors.shipping?.city && <p className="text-red-500 text-sm mt-1">{errors.shipping.city.message}</p>}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <label htmlFor="state" className={"block text-gray-700 dark:text-white mb-1"}>State</label>
                                    <Input type="text" id="state" {...register("shipping.state")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                    {errors.shipping?.state && <p className="text-red-500 text-sm mt-1">{errors.shipping.state.message}</p>}
                                </div>
                                <div>
                                    <label htmlFor="zip" className={"block text-gray-700 dark:text-white mb-1"}>ZIP Code</label>
                                    <Input type="text" id="zip" {...register("shipping.zipCode")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                    {errors.shipping?.zipCode && <p className="text-red-500 text-sm mt-1">{errors.shipping.zipCode.message}</p>}
                                </div>
                            </div>
                        </div>


                        <div>
                            <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-4">Payment Card</h2>

                            {cards.length === 0 ? (
                                <div className="text-center py-8 bg-gray-650 rounded-xl border  border-gray-600">
                                    <p className="text-white text-sm mb-4">No cards found. Add a card from your profile.</p>
                                    <Link href="/profile" className="text-sm bg-blue-500 hover:bg-blue-400 text-white px-5 py-2.5 rounded-lg transition-colors">
                                        Go to Profile
                                    </Link>
                                </div>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    {cards.map((card) => (
                                        <label
                                            key={card.id}
                                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCardId === card.id
                                                    ? " bg-teal-50"
                                                    : " hover:border-gray-400"
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="radio"
                                                    name="card"
                                                    value={card.id}
                                                    checked={selectedCardId === card.id}
                                                    onChange={() => { setSelectedCardId(card.id); setCardError(""); }}
                                                    className="accent-teal-500"
                                                />
                                                <div>
                                                    <p className="text-sm font-mono font-medium text-gray-400">
                                                        **** **** **** {card.cardNumber.slice(-4)}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-0.5">
                                                        {card.cardHolder} · Expires {card.expirationDate}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400">Balance</p>
                                                <p className={`text-sm font-bold ${card.balance >= totalPrice ? "text-green-600" : "text-red-500"}`}>
                                                    ${card.balance.toFixed(2)}
                                                </p>
                                            </div>
                                        </label>
                                    ))}

                                    {cardError && <p className="text-red-500 text-sm mt-1">{cardError}</p>}

                                    <div className="flex items-center justify-between mt-2 px-1">
                                        <p className="text-sm ">Order total:</p>
                                        <p className="text-base font-bold">${totalPrice.toFixed(2)}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <Button
                                type="submit"
                                disabled={cards.length === 0}
                                className="bg-teal-500 text-white px-8 py-3 rounded-lg hover:bg-teal-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-semibold"
                            >
                                Place Order
                            </Button>
                        </div>
                    </div>
                </div>
            </form>

            {showModal && (
                <Modal
                    message={`Your order placed successfully! Total: $${orderedTotal.toFixed(2)}`}
                    onClose={() => { setShowModal(false); router.push("/"); }}
                />
            )}
        </>
    );
}