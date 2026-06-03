import { z } from "zod";


export const checkoutSchema = z.object({
    shipping: z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters").max(15, "First name must be at most 50 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters.").max(15, "Last name must be at most 50 characters."),
        address: z.string().min(5, "Address must be at least 5 characters").max(100, "Address is too long"),
        city: z.string().min(1, "City is required").max(50, "City name is too long"),
        region: z.string().min(1, "Region is required").max(50, "Region name is too long"),
        zipCode: z.string().min(3).max(4).refine((val) => {
        return val.split("").every((char) => {
            return (char >= "0" && char <= "9");
        });
    }, {
        message: "Zip Code should only contain digits.",
    }),
    }),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;



export const contactSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(15, "First name must be at most 50 characters"),

    email: z.email("Please enter a valid email address"),

    phone: z.string().min(7, "Phone number must be at least 7 digits").max(15, "Phone number must be at most 15 digits").refine((val) => !isNaN(Number(val)), "Phone number must contain only digits"),


    message: z.string().min(10, "Message must be at least 10 characters")
})

export type contactFormData = z.infer<typeof contactSchema>;

export const registerSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});

export type registerFormData = z.infer<typeof registerSchema>

export const loginSchema = z.object({
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password should contain at least 8 characters.").max(20, "Password can't get over 20 characters."),
})

export type loginFormData = z.infer<typeof loginSchema>

export const cardSchema = z.object({
    cardNumber: z.string().refine((val) => {
    const cleaned = val.replaceAll(" ", "");
    return (
        cleaned.length === 16 &&
        cleaned.split("").every((c) => {
            return (c >= "0" && c <= "9");
        })
    );
    },
    {
        message: "Invalid card number",
    }
),
    cardHolder: z.string().min(2, "Card holder name required!"),
    expirationDate: z.string().min(5, "Can't get over 5 characters!").max(5, "Can't get over 5 characters!").refine((value) => {
    const parts = value.split("/");

    if (parts.length !== 2) {
        return false;
    }
    const month = Number(parts[0]);
    const year = Number(parts[1]);

    if (isNaN(month) || isNaN(year)) {
        return false;
    }
    if (month < 1 || month > 12) {
        return false;
    }
    const fullYear = 2000 + year;

    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();

    if (fullYear < currentYear) {
        return false;
    }
    if (fullYear === currentYear && month < currentMonth) {
        return false;
    }
    return true;
}, {
    message: "Invalid or expired date"
}),
    cvv: z.string().min(3).max(4).refine((val) => {
        return val.split("").every((char) => {
            return (char >= "0" && char <= "9");
        });
    }, {
        message: "CVV should only contain digits.",
    }),
});

export type CardFormData = z.infer<typeof cardSchema>