import z from "zod";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


// Admin registration schema
export const adminCreateUserSchema = z.object({
  fullname: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Minimum 6 characters"),
  address: z.string().min(5, "Enter your address"),
  phoneNumber: z
    .string()
    .min(10, { message: "Enter a valid number" })
    .max(15, { message: "Number too long" }),
     role: z.enum(["user", "admin"]),
});

export type AdminCreateUserData = z.infer<typeof adminCreateUserSchema>;