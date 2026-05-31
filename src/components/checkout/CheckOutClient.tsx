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
import { applyDiscount } from "@/lib/discountCodes";

export default function CheckOutPage() {
    const { totalPrice, clearCart, items } = useCart();
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();
    const [appliedCoupon, setAppliedCoupon] = useState("");
    const [orderedTotal, setOrderedTotal] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [cards, setCards] = useState<Card[]>([]);
    const [selectedCardId, setSelectedCardId] = useState("");
    const [cardError, setCardError] = useState("");

    const [coupon, setCoupon] = useState("");
    const [couponResult, setCouponResult] = useState<{ valid: boolean; discount: number; finalPrice: number } | null>(null);
    const [couponError, setCouponError] = useState("");

    const [showCouponModal, setShowCouponModal] = useState(false);
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
            shipping: { firstName: "", lastName: "", address: "", city: "", region: "", zipCode: "" },
        },
    });

    function onSubmit() {

        const finalAmount = couponResult ? couponResult.finalPrice : totalPrice;

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
        if (selectedCard.balance < finalAmount) {
            setCardError(`Insufficient balance. Card balance: $${selectedCard.balance.toFixed(2)}`);
            return;
        }

        items.forEach((item) => {
            const currentStock = getStock(item.product.id, item.product.stock);
            deductStock(item.product.id, currentStock, item.quantity)
        })
        deductBalance(user!.email, selectedCardId, finalAmount);

        if (appliedCoupon) {
            const usedCoupons: string[] = JSON.parse(localStorage.getItem("usedCoupons") || "[]");

            if (!usedCoupons.includes(appliedCoupon)) {
                localStorage.setItem("usedCoupons", JSON.stringify([...usedCoupons, appliedCoupon])
                );
            }
        }
        setOrderedTotal(finalAmount);
        clearCart();
        reset();
        setShowModal(true);


        setCards(getCards(user!.email));
    }
    function handleApplyCoupon() {
        if (!coupon.trim()) {
            return;
        }

        const normalizedCoupon = coupon.trim().toUpperCase();

        const usedCoupons: string[] = JSON.parse(
            localStorage.getItem("usedCoupons") || "[]"
        );

        if (usedCoupons.includes(normalizedCoupon)) {
            setCouponError("This coupon has already been used.");
            setCouponResult(null);
            return;
        }

        const result = applyDiscount(normalizedCoupon, totalPrice);

        if (!result.valid) {
            setCouponError("Invalid coupon code.");
            setCouponResult(null);
            return;
        }

        setAppliedCoupon(normalizedCoupon);
        setCouponResult(result);
        setShowCouponModal(true);
        setCouponError("");
    }
    if (items.length === 0 && !showModal) {
        return (
            <main className="min-h-screen bg-zinc-50 dark:bg-gray-950 pt-24 flex flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-400">Your cart is empty</h2>
                <Link href="/products">
                    <Button className="mt-4 bg-black text-white px-8 py-3 dark:text-white rounded font-semibold hover:bg-gray-800 transition-colors">
                        Continue Shopping
                    </Button>
                </Link>
            </main>
        );
    }



    return (
        <>
            <form method="POST" onSubmit={handleSubmit(onSubmit)} className="min-h-screen pt-30 bg-gray-100 dark:bg-gray-950 py-10">
                <div className="w-full max-w-3xl  mx-auto p-4">
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
                                    <Input type="text" id="state" {...register("shipping.region")} className={"w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500"} />
                                    {errors.shipping?.region && <p className="text-red-500 text-sm mt-1">{errors.shipping.region.message}</p>}
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
                                            className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedCardId === card.id ? " bg-teal-50" : " hover:border-gray-400"}`}>
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


                                    <div className="mt-4">
                                        <label className="block text-gray-700 dark:text-white mb-1 text-sm">
                                            Discount Code
                                        </label>

                                        <div className="flex gap-2">
                                            <Input
                                                type="text"
                                                value={coupon}
                                                onChange={(e) => {
                                                    setCoupon(e.target.value);
                                                    setCouponError("");
                                                    setCouponResult(null);
                                                }}
                                                placeholder="Enter coupon code"
                                                className="flex-1 rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-gray-600 outline-none focus:ring-2 focus:ring-teal-500 text-sm"
                                            />

                                            <Button
                                                type="button"
                                                onClick={handleApplyCoupon}
                                                className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors text-sm font-medium"
                                            >
                                                Apply
                                            </Button>
                                        </div>

                                        {couponError && (
                                            <p className="text-red-500 text-xs mt-1">
                                                {couponError}
                                            </p>
                                        )}

                                        {showCouponModal && (
                                            <Modal
                                                message={`Coupon applied! You save $${couponResult?.discount.toFixed(2)}`}
                                                onClose={() => setShowCouponModal(false)}
                                            />
                                        )}
                                    </div>


                                    <div className="flex items-center justify-between mt-3 px-1">
                                        <p className="text-sm text-gray-500">Order total:</p>

                                        <div className="text-right">
                                            {couponResult?.valid && (
                                                <p className="text-xs text-gray-400 line-through">
                                                    ${totalPrice.toFixed(2)}
                                                </p>
                                            )}

                                            <p className="text-base font-bold text-gray-900 dark:text-white">
                                                ${(couponResult?.finalPrice ?? totalPrice).toFixed(2)}
                                            </p>
                                        </div>
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