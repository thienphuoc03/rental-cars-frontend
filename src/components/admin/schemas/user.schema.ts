import { z } from 'zod';

export const userSchema = z.object({
  id: z.string(),
  username: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string(),
  gender: z.string(),
  address: z.string(),
  status: z.string(),
  role: z.string(),
});

export type UserType = z.infer<typeof userSchema>;
