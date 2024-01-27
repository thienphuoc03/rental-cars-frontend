import { z } from 'zod';

const createCarSchema = z.object({
  images: z.any(),
  licensePlates: z.string(),
  brandId: z.number(),
  modelId: z.number(),
  seats: z.number(),
  yearOfManufacture: z.number(),
  transmission: z.string(),
  fuel: z.string(),
  description: z.string(),
  features: z.array(z.number()),
  pricePerDay: z.number(),
});

export default createCarSchema;
