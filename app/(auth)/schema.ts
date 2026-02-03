import z from "zod";

export const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
});

export type LoginData = z.infer<typeof loginSchema>;


export const forgotPasswordSchema = z.object({
  email: z.string().email("Enter a valid email"),
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;


export const registerSchema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  address: z.string().min(5, "Enter your address"),
  phoneNumber: z
    .string()
    .min(10, { message: "Enter a valid number" })
    .max(15, { message: "Number too long" }),
});

export type RegisterData = z.infer<typeof registerSchema>;

