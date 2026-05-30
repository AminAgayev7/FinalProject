import { Metadata } from "next";

import CheckOutPage from "@/components/checkout/CheckOutClient";
export const metadata: Metadata = {
    title: "Checkout",
};

export default function CheckOut() {
    return <CheckOutPage />;
}