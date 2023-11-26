import { z } from 'zod';

const EditProfileSchema = z.object({
  name: z.string(),
  dateOfBirth: z.date(),
  gender: z.string(),
});

export default EditProfileSchema;
