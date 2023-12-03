import { z } from 'zod';

export const carSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  licensePlates: z.string(),
  seats: z.string(),
  yearOfManufacture: z.string(),
  transmission: z.string(),
  fuel: z.string(),
  description: z.string(),
  pricePerDay: z.string(),
  address: z.string(),
  model: z.string(),
  brand: z.string(),
  CarImage: z.array(z.string()),
  CarFeatures: z.array(z.string()),
  status: z.string(),
});

export type CarType = z.infer<typeof carSchema>;
