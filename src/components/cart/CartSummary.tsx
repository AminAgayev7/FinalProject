import Link from "next/link";

type CartSummaryProps = {
    originalTotal: number;
    totalDiscount: number;
    totalPrice: number;
};

export default function CartSummary({ originalTotal, totalDiscount, totalPrice }: CartSummaryProps) {
    return (
        <div className="shadow-lg p-5 rounded-md bg-white w-full md:max-w-sm md:sticky md:top-24 border border-gray-100">
            <h2 className="text-lg text-gray-900 font-semibold mb-4">
                Order Summary
            </h2>

            <div className="space-y-2 border-b pb-4">
                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Subtotal
                    </span>

                    <span className="text-gray-800 font-bold">
                        ${originalTotal.toFixed(2)}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600">
                        Discount
                    </span>

                    <span className="text-green-600 font-bold">
                        -${totalDiscount.toFixed(2)}
                    </span>
                </div>
            </div>

            <div className="flex justify-between mt-4">
                <span className="text-gray-900 font-semibold text-lg">
                    Total
                </span>

                <span className="text-gray-900 font-bold text-lg">
                    ${totalPrice.toFixed(2)}
                </span>
            </div>

            <div className="flex flex-col gap-3 mt-6">
                <Link href="/checkout" className="bg-blue-500 text-center text-white py-2.5 px-4 rounded-md hover:bg-blue-600 transition-colors font-medium">
                    Proceed to Checkout
                </Link>

                <Link href="/" className="text-center border border-gray-300 rounded-md py-2 px-4 text-black hover:bg-gray-50 transition-colors">
                    Continue shopping
                </Link>
            </div>
        </div>
    );
}