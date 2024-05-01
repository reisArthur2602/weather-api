import { z } from 'zod';

export const ForecastSchema = z.object({
  city: z.string().transform((name) => {
    return name
      .trim()
      .split(' ')
      .map((word) => {
        return word.toLocaleLowerCase()
      }).join(" ");
  }),
});