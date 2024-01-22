import { z } from 'zod';

const ResetPasswordSchema = z.object({
  currentPassword: z.string().min(6).max(100),
  newPassword: z.string().min(6).max(100),
  confirmNewPassword: z.string().min(6).max(100),
});

export default ResetPasswordSchema;
