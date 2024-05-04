import { z } from 'zod';
import { formatDate } from '../utils/Date';

export const CitySchema = z.object({
  city: z
    .string()
    .trim()
    .transform((city) => {
      return city.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }),
});

export const FilterSchema = z.object({
  city: z
    .string()
    .trim()
    .transform((city) => {
      return city.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
    }),
  startDate: z.coerce.date().transform((date) => formatDate(date)),
  endDate: z.coerce.date().transform((date) => formatDate(date)),
});
