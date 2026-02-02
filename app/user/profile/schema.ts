import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const UserSchema = z.object({
  fullname: z.string().optional(),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  address: z.string().min(3, "Address is required"),
  phoneNumber: z.string().min(10, "Phone number is required"),
  role: z.enum(["user", "admin"]).default("user"),
  profileUrl: z.string().optional(),
});

export type UserType = z.infer<typeof UserSchema>;

export const updateUserSchema = z.object({
  firstName: z.string().min(2, { message: "Minimum 2 characters" }),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, { message: "Phone number is required" }),
  address: z.string().min(3, { message: "Address is required" }),
  profileUrl: z
    .any()
    .optional()
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
      message: "Max file size is 5MB",
    })
    .refine((file) => !file || ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: "Only .jpg, .jpeg, .png and .webp formats are supported",
    }),
});

export type UpdateUserData = z.infer<typeof updateUserSchema>;
