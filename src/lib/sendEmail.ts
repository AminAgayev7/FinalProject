import emailjs from "@emailjs/browser";

export interface EmailData {
  [key: string]: string;
  from_name: string;
  from_email: string;
  subject: string;
  message: string;
}

export async function sendEmail(data: EmailData) {
  return emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
    data,
    process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!,
  );
}
