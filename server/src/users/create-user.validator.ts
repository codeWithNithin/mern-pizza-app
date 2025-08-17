import {z} from "zod";

export const createUserSchema = z.object({
    email: z.string().email('Invalid email address'),
    userName: z.string().min(3, 'Username must be at least 3 characters long'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
})