import { z } from 'zod';

const FilterSchema = z.object({
  sortPrice: z.string().optional(),
  priceRange: z.array(z.number()).optional(),
  seats: z.array(z.number()).optional(),
  brandId: z.number().optional(),
  modelId: z.number().optional(),
});

export default FilterSchema;
