import { RequestHandler } from 'express';
import { z } from 'zod';
import * as forecast from '../services/forecast';
import { ForecastSchema } from '../schemas/forecast';

export const getByCity: RequestHandler = async (req, res) => {
  const body = ForecastSchema.safeParse({ city: req.query.city });

  if (!body.success) return res.json({ error: 'Dados Inválidos' });

  const data = await forecast.getCity(body.data.city);

  return res.json({ current: data });
};
