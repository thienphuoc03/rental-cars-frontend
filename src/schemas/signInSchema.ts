import * as z from 'zod';

const signInSchema = z.object({
  username: z.string().min(6).max(50),
  password: z.string().min(6),
});

export default signInSchema;
