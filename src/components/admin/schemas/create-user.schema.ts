import { z } from 'zod';

import { USERNAME_PATTERN } from '@/components/admin/utils/constants';

const CreateUserSchema = z.object({
  avatarUrl: z.string().min(0).optional().or(z.literal(undefined)),
  name: z.string().min(3),
  username: z
    .string()
    .min(6)
    .refine(
      (username) => {
        return USERNAME_PATTERN.test(username);
      },
      {
        message: 'Tên tài khoản không hợp lệ',
      },
    ),
  email: z.string().email(),
  password: z.string().min(6),
  address: z.string().min(0).optional().or(z.literal(undefined)),
  dateOfBirth: z.date().optional().or(z.literal(undefined)),
  gender: z.string().min(0).optional().or(z.literal(undefined)),
  phone: z.string().optional().or(z.literal(undefined)),
  role: z.string(),
});

export default CreateUserSchema;
