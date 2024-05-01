import { z } from 'zod';

export const ForecastSchema = z.object({
  city: z.string().transform((name) => {
    return name
      .trim()
      .split(' ')
      .map((word) => {
        return word[0].toLocaleUpperCase().concat(word.substring(1));
      }).join(" ");
  }),
});
