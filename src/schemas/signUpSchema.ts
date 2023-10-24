import * as z from 'zod';

const signUpSchema = z.object({
  username: z.string().min(6).max(50),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export default signUpSchema;
