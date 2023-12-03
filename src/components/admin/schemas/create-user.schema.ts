import { z } from 'zod';

import { USERNAME_PATTERN } from '@/components/admin/utils/constants';

const CreateUserSchema = z.object({
  avatarUrl: z.string().optional(),
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
  address: z.string().optional(),
  dateOfBirth: z.date().optional(),
  gender: z.string().optional(),
  phone: z.string().min(10).max(12).optional(),
  role: z.string(),
});

export default CreateUserSchema;
