import * as z from 'zod';

const SearchSchema = z.object({
  startDate: z.string().nonempty(),
  endDate: z.string().nonempty(),
});

export default SearchSchema;
