import { RequestHandler } from 'express';
import * as forecast from '../services/forecast';
import { ForecastSchema } from '../schemas/forecast';
import { getCurrentDate } from '../utils/getCurrentDate';

export const getByCity: RequestHandler = async (req, res) => {
  const body = ForecastSchema.safeParse({ city: req.query.city });
  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const findCity = await forecast.findCity(body.data.city);

  if (!findCity) {
    const data = await forecast.getCity(body.data.city);
    if (data) {
      const saved = await forecast.save({ ...data });
      return res.json(saved);
    }
  }

  if (findCity) {
    if (findCity.date !== getCurrentDate()) {
      const data = await forecast.getCity(body.data.city);
      console.log(data, findCity);

      if (data) {
        const updated = await forecast.updateCity({ id: findCity.id, ...data });
        return res.json(updated);
      }
    }
    return res.json(findCity);
  }
};
