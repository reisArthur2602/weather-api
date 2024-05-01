import { z } from 'zod';

export const ForecastSchema = z.object({
  city: z.string(),
});
