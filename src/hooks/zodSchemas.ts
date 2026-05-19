import { z, ZodLazy } from "zod";


export const checkoutSchema = z.object({
    shipping: z.object({
        firstName: z.string().min(2, "First name must be at least 2 characters").max(15, "First name must be at most 50 characters"),
        lastName: z.string().min(2, "Last name must be at least 2 characters.").max(15, "Last name must be at most 50 characters."),
        address: z.string().min(5, "Address must be at least 5 characters").max(100, "Address is too long"),
        city: z.string().min(1, "City is required").max(50, "City name is too long"),
        state: z.string().min(1, "State is required").max(50, "State name is too long"),
        zipCode: z.string().min(4, "ZIP code must be at least 4 characters").max(10, "ZIP code is too long"),
    }),

    payment: z.object({
        cardNumber: z.string().length(16, "Card number must be 16 digits"),
        expirationDate: z.string().min(4, "Expiration date is required").max(5, "Invalid format"),
        cvv: z.string().min(3, "CVV must be at least 3 digits").max(4, "CVV must be at most 4 digits"),
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