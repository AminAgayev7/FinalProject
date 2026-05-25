'use client'

import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { getCards } from "@/lib/cardStorage";
import { cardSchema } from "@/hooks/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Card } from "@/types/card";
import { CardFormData } from "@/hooks/zodSchemas";
import { addCard } from "@/lib/cardStorage";
import { deleteCard } from "@/lib/cardStorage";
import Input from "@/components/ui/Input";
import Image from "next/image";

export default function UserProfile() {

    const { user, logout, isAuthenticated } = useAuth();
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [cards, setCards] = useState<Card[]>([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [error, setError] = useState("");
    const [showCardInfo, setShowCardInfo] = useState<string | null>(null);

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<CardFormData>(
        { resolver: zodResolver(cardSchema) }
    );

    useEffect(() => {
        if (!isAuthenticated) {
            router.push("/auth/login");
            return;
        }

        if (user) {
            setCards(getCards(user.email));
            const savedImage = localStorage.getItem(`profileImage_${user.email}`);
            if (savedImage) {
                setProfileImage(savedImage);
            }
        }

    }, [isAuthenticated, user, router]);

    const handleAddCard = (data: CardFormData) => {
        if (!user) {
            return;
        }
        const existingCards = getCards(user.email);

        const isDuplicate = existingCards.some((c) => {
            return (c.cardNumber === data.cardNumber && c.cvv === data.cvv)
        });

        if (isDuplicate) {
            setError("This card number already exists.");
            return;
        }

        const success = addCard(user.email, data);

        if (!success) {
            setError("Maximum 3 cards allowed.");
            return;
        }

        setCards(getCards(user.email));
        setShowAddForm(false);
        reset();
        setError("");
    };

    const handleDelete = (cardId: string) => {
        if (!user) {
            return;
        }

        deleteCard(user.email, cardId);
        setCards(getCards(user.email));

        if (showCardInfo === cardId) {
            setShowCardInfo(null);
        }
    };

    if (!user) {
        return null;
    }
    function handleProfileImage(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files?.[0];

        if (!file || !user) {
            return;
        }

        const reader = new FileReader();

        reader.onloadend = () => {
            const imageBase64 = reader.result as string;

            setProfileImage(imageBase64);

            localStorage.setItem(`profileImage_${user.email}`, imageBase64);
        };

        reader.readAsDataURL(file);
    }

    function removeProfileImage() {
        if (!user) {
            return;
        }

        localStorage.removeItem(`profileImage_${user.email}`);

        setProfileImage(null);
    }
    useEffect(() => {
        document.body.classList.add("hide-footer");

        return () => {
            document.body.classList.remove("hide-footer");
        };
    }, []);
    return (
        <div className="min-h-screen bg-linear-to-br from-gray-300 via-white to-indigo-100 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950 flex justify-center items-center p-3 sm:p-5 overflow-y-auto">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-6xl p-4 sm:p-6 md:p-8 my-6">
                <div className="flex flex-col items-center lg:flex-row gap-8">

                    <div className="w-full lg:w-1/3 text-center">
                        <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4">
                            {
                                profileImage ? (
                                    <Image
                                        width={192}
                                        height={192}
                                        src={profileImage}
                                        alt="Profile"
                                        className="w-full h-full rounded-full object-cover border-4 border-indigo-800 dark:border-blue-900"
                                    />
                                ) : (
                                    <div className="rounded-full flex items-center justify-center text-4xl sm:text-5xl text-white bg-linear-to-br from-blue-400 to-purple-500 w-full h-full border-4 border-indigo-800 dark:border-blue-900">
                                        {user?.firstName.charAt(0)}
                                    </div>
                                )
                            }
                        </div>


                        <h1 className="text-xl sm:text-2xl font-bold text-indigo-800 dark:text-white mb-2 wrap-break-word">
                            {user?.firstName}
                        </h1>

                        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 wrap-break-word">
                            {user?.email}
                        </p>

                        <div className="grid grid-cols-2 gap-2 justify-center mt-4">


                            {cards.length < 3 && (
                                <Button
                                    onClick={() => setShowAddForm(!showAddForm)}
                                    className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                                >
                                    {showAddForm ? "Cancel" : "Add Card"}
                                </Button>
                            )}

                            <label className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300">
                                Upload Profile Photo

                                <Input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleProfileImage}
                                    className="hidden"
                                />
                            </label>
                            {
                                profileImage && (
                                    <Button
                                        onClick={removeProfileImage}
                                        className="bg-red-700  text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-300"
                                    >
                                        Remove Profile Photo
                                    </Button>
                                )
                            }
                            <Button
                                onClick={() => {
                                    logout();
                                    router.push("/");
                                }}
                                className="bg-red-700  text-white px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-300"
                            >
                                Log Out
                            </Button>
                        </div>
                    </div>

                    <div className="w-full lg:w-2/3 flex flex-col gap-4 min-h-75 justify-center">

                        {
                            showAddForm && (
                                <form
                                    onSubmit={handleSubmit(handleAddCard)}
                                    className="border p-3 sm:p-4 border-gray-700 rounded-md"
                                >
                                    <h3 className="text-base sm:text-lg font-semibold text-gray-700 mb-3">
                                        New Card
                                    </h3>

                                    {
                                        error && (
                                            <p className="text-red-500 text-xs mb-2">
                                                {error}
                                            </p>
                                        )
                                    }

                                    <div className="flex flex-col gap-y-3">

                                        <div className="border-b border-gray-600 flex flex-col gap-y-1">
                                            <label htmlFor="holder">
                                                Card Holder
                                            </label>

                                            <Input
                                                id="holder"
                                                {...register("cardHolder")}
                                                className="border-none outline-none w-full"
                                            />

                                            {
                                                errors.cardHolder && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors.cardHolder.message}
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <div className="border-b border-gray-600 flex flex-col gap-y-1">
                                            <label htmlFor="cardNumber">
                                                Card Number
                                            </label>

                                            <Input
                                                id="cardNumber"
                                                {...register("cardNumber")}
                                                className="border-none outline-none w-full"
                                            />

                                            {
                                                errors.cardNumber && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors.cardNumber.message}
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <div className="border-b border-gray-600 flex flex-col gap-y-1">
                                            <label htmlFor="cvv">
                                                CVV Number
                                            </label>

                                            <Input
                                                id="cvv"
                                                {...register("cvv")}
                                                className="border-none outline-none w-full"
                                            />

                                            {
                                                errors.cvv && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors.cvv.message}
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <div className="border-b border-gray-600 flex flex-col gap-y-1">
                                            <label htmlFor="expDate">
                                                Expiration Date
                                            </label>

                                            <Input
                                                id="expDate"
                                                {...register("expirationDate")}

                                                className="border-none outline-none w-full"
                                            />

                                            {
                                                errors.expirationDate && (
                                                    <p className="text-red-500 text-xs">
                                                        {errors.expirationDate.message}
                                                    </p>
                                                )
                                            }
                                        </div>

                                        <Button
                                            type="submit"
                                            className="mt-4 bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                                        >
                                            Add Card
                                        </Button>
                                    </div>
                                </form>
                            )
                        }

                        {
                            cards.length > 0 ?
                                cards.map((card, index) => (
                                    <div
                                        key={card.id}
                                        className="border border-gray-200 dark:border-gray-700 rounded-xl p-3 sm:p-4"
                                    >
                                        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">

                                            <Button
                                                onClick={() => {
                                                    setShowCardInfo(showCardInfo === card.id ? null : card.id)
                                                }}
                                                className="bg-indigo-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors duration-300"
                                            >
                                                {`Card ${index + 1}`}
                                            </Button>

                                            <Button
                                                onClick={() => handleDelete(card.id)}
                                                className="bg-red-700 hover:bg-red-800 text-white px-4 py-2 rounded-lg  transition-colors duration-300"
                                            >
                                                Delete
                                            </Button>
                                        </div>

                                        {
                                            showCardInfo === card.id && (
                                                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-4 sm:p-6 shadow-sm hover:shadow-md transition mt-4">

                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-gray-200 dark:border-gray-700">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Card Owner
                                                        </span>

                                                        <span className="font-semibold text-gray-900 dark:text-white wrap-break-word">
                                                            {card.cardHolder}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-gray-200 dark:border-gray-700">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Card Number
                                                        </span>

                                                        <span className="font-semibold tracking-widest text-gray-900 dark:text-white break-all">
                                                            {card.cardNumber && `************${card.cardNumber.slice(12, 16)}`}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-gray-200 dark:border-gray-700">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            CVV
                                                        </span>

                                                        <span className="font-semibold text-gray-900 dark:text-white">
                                                            {card.cvv && `***`}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 py-3 border-b border-gray-200 dark:border-gray-700">
                                                        <span className="text-gray-600 dark:text-gray-400">
                                                            Expiration Date
                                                        </span>

                                                        <span className="font-semibold text-gray-900 dark:text-white">
                                                            {card.expirationDate}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col text-2xl sm:flex-row sm:justify-between sm:items-center gap-1 py-3">
                                                        <span className="text-green-400">
                                                            Balance
                                                        </span>

                                                        <span className="font-bold text-green-400 wrap-break-word">
                                                            {card.balance}$
                                                        </span>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    </div>
                                )) : (
                                    !showAddForm && (
                                        <div className="flex flex-col items-center justify-center text-center p-8 sm:p-12 border-2 border border-gray-300 dark:border-gray-600 rounded-2xl bg-gray-50 dark:bg-gray-800/50 min-h-[300px]">
                                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-100 dark:bg-gray-700 rounded-full flex items-center justify-center mb-4">
                                                <svg className="w-8 h-8 sm:w-10 sm:h-10 text-indigo-600 dark:text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white mb-2">
                                                No Cards Added Yet
                                            </h2>
                                            <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 max-w-sm mb-6">
                                                Securely store your payment methods here. You can add up to 3 cards for quick access.
                                            </p>
                                            <Button
                                                onClick={() => setShowAddForm(true)}
                                                className="bg-indigo-800 text-white px-6 py-2.5 rounded-lg hover:bg-blue-900 transition-colors duration-300 shadow-md font-medium"
                                            >
                                                Add Your First Card
                                            </Button>
                                        </div>
                                    )
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}