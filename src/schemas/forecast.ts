import { z } from 'zod';


export const CitySchema = z.object({
  city: z
    .string()
    .trim()
    .transform((city) => {
      return city.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }),
});

export const FilterSchema = z.object({
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
  city: z
    .string()
    .trim()
    .transform((city) => {
      return city.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }),
});

