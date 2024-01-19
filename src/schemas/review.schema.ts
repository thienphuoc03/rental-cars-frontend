import { z } from 'zod';

const ReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  content: z.string(),
});

export default ReviewSchema;
