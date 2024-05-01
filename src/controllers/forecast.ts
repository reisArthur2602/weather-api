import { RequestHandler } from 'express';
import * as forecast from '../services/forecast';
import { ForecastSchema } from '../schemas/forecast';

export const getByCity: RequestHandler = async (req, res) => {
  const body = ForecastSchema.safeParse({ city: req.query.city });
  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const findCity = await forecast.findCity(body.data.city);
  
  if (!findCity) {
    const data = await forecast.getCity(body.data.city);
    if (data) {
      const save = await forecast.save({ ...data });
      return res.json({ current: save });
    }
  }
  return res.json({ current: findCity });
};
