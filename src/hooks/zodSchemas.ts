import { z } from "zod";

export const checkoutSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters"),

    lastName: z.string().min(2, "Last name must be at least 2 characters").max(50, "Last name must be at most 50 characters"),

    email: z.string().email("Please enter a valid email address"),

    phone: z.string().min(7, "Phone number must be at least 7 digits").max(15, "Phone number must be at most 15 digits").refine((val) => !isNaN(Number(val)), "Phone number must contain only digits"),

    city: z.string().min(2, "City must be at least 2 characters"),

    street: z.string().min(5, "Street address must be at least 5 characters"),

    postalCode: z.string().min(4, "Postal code must be at least 4 digits").max(10, "Postal code must be at most 10 digits").refine(val => !isNaN(Number(val)), "Postal code must contain only digits"),
});

export type CheckoutFormData = z.infer<typeof checkoutSchema>;


export const contactSchema = z.object({
    firstName: z.string().min(2, "First name must be at least 2 characters").max(50, "First name must be at most 50 characters"),

    email: z.string().email("Please enter a valid email address"),

    phone: z.string().min(7, "Phone number must be at least 7 digits").max(15, "Phone number must be at most 15 digits").refine((val) => !isNaN(Number(val)), "Phone number must contain only digits"),


    message: z.string().min(10, "Message must be at least 10 characters")
})

export type contactFormData = z.infer<typeof contactSchema>;