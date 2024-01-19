import { z } from 'zod';

const OwnerRegistrationSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  phone: z.string().min(10).max(11),
  licensePlates: z.string().min(3).max(50),
});

export default OwnerRegistrationSchema;
