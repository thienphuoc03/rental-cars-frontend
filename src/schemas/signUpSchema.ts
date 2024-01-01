import * as z from 'zod';

const signUpSchema = z.object({
  username: z
    .string()
    .min(6)
    .max(50)
    .regex(/^[a-z]+(?:\d+)?$/, {
      message: 'Tài khoản chứa ký tự từ a-z và số, không chứa ký tự đặc biệt',
    }),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
});

export default signUpSchema;
