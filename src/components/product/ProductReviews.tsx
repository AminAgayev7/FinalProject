"use client";

import { Product } from "@/types/product";
import Input from "../ui/Input";
type Comment = NonNullable<Product["comments"]>[number];
import Button from "../ui/Button";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {storageGet, storageSet} from "@/lib/safeStorage";
export default function CommentsSection({ comments: initialComments, productId }: { comments: Comment[]; productId: number }) {
    const { isAuthenticated, user } = useAuth();
    const [comments, setComments] = useState<Comment[]>(initialComments);
    const [text, setText] = useState("");
    const [selectedRating, setSelectedRating] = useState(0);


    const hasCommented = user ? comments.some((comment) => {
        return comment.user === `${user.firstName} ${user.lastName}`;
    }) : false;

    const handleSubmit = () => {
        if (!text.trim() || !user) {
            return;
        }

        const newComment: Comment = {
            id: Date.now(),
            user: `${user.firstName} ${user.lastName}`,
            avatar: "",
            email: user.email,
            rating: selectedRating,
            date: new Date().toISOString().split("T")[0],
            verified: true,
            comment: text.trim(),
        };
        
        const existingComments = storageGet(`comments_product_${productId}`, null) as Comment[] | null;

        if (existingComments && Array.isArray(existingComments)) {
            const parsedComments: Comment[] = existingComments;
            parsedComments.push(newComment);
            storageSet(`comments_product_${productId}`, parsedComments);
        } else {
            storageSet(`comments_product_${productId}`, [newComment]);
        }
        setComments((prev) => {
            return [...prev, newComment]
    });
        setText("");
        setSelectedRating(0);
    };

    return (
        <section className="bg-zinc-50 dark:bg-gray-950 pb-16 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 py-4 rounded-lg dark:bg-gray-900 shadow-lg mx-auto">
                <div className="w-full flex flex-col justify-start items-start lg:gap-14 gap-7">
                    <h2 className="text-gray-900 dark:text-white text-4xl font-bold leading-normal">
                        Comments
                    </h2>

                    <div className="w-full flex flex-col justify-start items-start gap-8">

                        {comments?.map((comment) => {
                            const liveAvatar = comment.email ? storageGet(`profileImage_${comment.email}`, null) : null;
                            const avatarSrc = liveAvatar || comment.avatar;

                            return (
                                <div key={comment.id} className="w-full lg:p-8 p-5 bg-white dark:bg-gray-800 rounded-3xl border border-gray-200 dark:border-gray-600 flex flex-col">
                                    <div className="w-full flex flex-col gap-3.5">
                                        <div className="w-full flex justify-between items-center">
                                            <div className="flex items-center gap-2.5">
                                                <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-linear-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                                                    {avatarSrc ? (
                                                        <Image
                                                            width={40}
                                                            height={40}
                                                            className="w-full h-full rounded-full object-cover"
                                                            src={avatarSrc}
                                                            alt={comment.user}
                                                        />
                                                    ) : (
                                                        <span className="text-white text-xs font-semibold">
                                                            {comment.user.charAt(0).toUpperCase()}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <h5 className="text-gray-900 dark:text-white text-sm font-semibold">
                                                            {comment.user}
                                                        </h5>
                                                        {comment.verified && (
                                                            <span className="text-xs text-green-600 dark:text-green-400 bg-green-50 px-2 py-0.5 rounded">
                                                                Verified
                                                            </span>
                                                        )}
                                                    </div>
                                                    <h6 className="text-gray-500 dark:text-gray-400 text-xs font-normal">
                                                        {comment.date}
                                                    </h6>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-1">
                                                {Array.from({ length: 5 }).map((item, i) => (
                                                    <span
                                                        key={i}
                                                        className={`fa-star fa-solid text-xs ${i < comment.rating ? "text-amber-400" : "text-gray-200"}`}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        <p className="text-gray-800 dark:text-white text-sm font-normal leading-snug">
                                            {comment.comment}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}


                        {
                            isAuthenticated ? (
                                hasCommented ? (
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        You have already commented on this product.
                                    </p>
                                ) : (
                                    <div className="w-full flex flex-col gap-4">
                                        <div className="flex items-center gap-1">
                                            {Array.from({ length: 5 }).map((_, i) => (
                                                <Button
                                                    key={i}
                                                    onClick={() => setSelectedRating(i + 1)}
                                                    className={`fa-star fa-solid text-xl transition-colors ${i < selectedRating ? "text-amber-400" : "text-gray-300"}`}
                                                />
                                            ))}
                                        </div>
                                        <div className="w-full relative flex gap-2">
                                            <Input
                                                type="text"
                                                value={text}
                                                onChange={(e) => setText(e.target.value)}
                                                onKeyDown={(e) => { if (e.key === "Enter") handleSubmit(); }}
                                                placeholder="Leave a comment..."
                                                className="w-full py-3 px-5 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 shadow focus:outline-none text-gray-900 dark:text-white placeholder-gray-400 text-base"
                                            />
                                            <Button
                                                onClick={handleSubmit}
                                                className="absolute right-6 top-4"
                                            >
                                                <i className="fa-solid text-black dark:text-white fa-paper-plane"></i>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            ) : (
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    <Link href="/auth/login" className="text-blue-500 hover:underline font-medium">Login</Link> to leave a comment.
                                </p>
                            )
                        }
                    </div>
                </div>
            </div>
        </section>
    );
}