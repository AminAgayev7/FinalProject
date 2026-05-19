"use client";
import Image from "next/image";
import { Product } from "@/types/product";
import Input from "../ui/Input";
type Comment = NonNullable<Product["comments"]>[number];
import Button from "../ui/Button";
export default function CommentsSection({ comments }: { comments: Comment[] }) {
    return (
        <section className="bg-zinc-50 pb-16 relative">
            <div className="w-full max-w-7xl px-4 md:px-5 lg:px-5 py-4 rounded-lg border shadow-lg mx-auto">
                <div className="w-full flex flex-col justify-start items-start lg:gap-14 gap-7">
                    <h2 className="text-gray-900 text-4xl font-bold leading-normal">
                        Comments
                    </h2>

                    <div className="w-full flex flex-col justify-start items-start gap-8">

                        {comments?.map((comment) => (
                            <div key={comment.id} className="w-full lg:p-8 p-5 bg-white rounded-3xl border border-gray-200 flex flex-col">
                                <div className="w-full flex flex-col gap-3.5">
                                    <div className="w-full flex justify-between items-center">

                                        <div className="flex items-center gap-2.5">
                                            <div className="w-10 h-10 bg-stone-300 rounded-full overflow-hidden shrink-0">
                                                <Image
                                                    className="w-full h-full rounded-full object-cover"
                                                    src={comment.avatar}
                                                    alt={comment.user}
                                                    width={40}
                                                    height={40}
                                                />
                                            </div>
                                            <div className="flex flex-col gap-1">
                                                <div className="flex items-center gap-2">
                                                    <h5 className="text-gray-900 text-sm font-semibold">
                                                        {comment.user}
                                                    </h5>
                                                    {comment.verified && (
                                                        <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded">
                                                            Verified
                                                        </span>
                                                    )}
                                                </div>
                                                <h6 className="text-gray-500 text-xs font-normal">
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

                                    <p className="text-gray-800 text-sm font-normal leading-snug">
                                        {comment.comment}
                                    </p>
                                </div>
                            </div>
                        ))}


                        <div className="w-full relative flex justify-between gap-2">

                            <Input type="text"
                                placeholder="Leave a comment..."
                                className="w-full py-3 px-5 rounded-lg border border-gray-300 bg-white shadow focus:outline-none text-gray-900 placeholder-gray-400 text-base">

                            </Input>

                            <Button className="absolute right-6 top-4.5">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 20 20"
                                    fill="none"
                                >
                                    <g clipPath="url(#clip0_2063_2504)">
                                        <path
                                            d="M10.0194 1.66699V5.6556C1.69526 5.6556 1.54178 14.4163 1.69573 18.3337C1.69573 16.4818 5.84659 10.0003 10.0194 10.6414V14.63L18.3332 8.14847L10.0194 1.66699Z"
                                            stroke="#111827"
                                            strokeWidth="1.6"
                                            strokeLinejoin="round"
                                        />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2063_2504">
                                            <rect width="20" height="20" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}