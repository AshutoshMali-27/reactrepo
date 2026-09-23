import { z } from "zod";

export const userSchema = z.object({
    UserName: z.string().min(2),
    Email: z.email(),
    PasswordHash: z.string().min(6),
    PhoneNumber: z.string().min(10).max(15),
});