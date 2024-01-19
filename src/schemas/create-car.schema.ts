import { z } from 'zod';

const createCarSchema = z.object({
  // images: z.array(z.any()),
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
  province_name: z.string(),
  district_name: z.string(),
  ward_name: z.string(),
});

export default createCarSchema;
