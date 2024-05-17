import { Request, RequestHandler, Response } from 'express';
import * as forecast from '../services/forecast';
import { CitySchema, FilterSchema } from '../schemas/forecast';
import { diffDays} from '../utils/Date';

export const getByCity: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const body = CitySchema.safeParse({ city: req.params.city });
  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const city = body.data.city;

  const existingData = await forecast.findWeatherCurrent(city);

  if (!existingData) {
    const data = await forecast.getWeatherForecast(city);
    if (data) {
      await forecast.updateDB(data, city);
      const result = await forecast.findWeatherCurrent(city);
      return res.json(result);
    }
  }
  return res.json(existingData);
};

export const getCityByFilter: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const body = FilterSchema.safeParse({
    city: req.query.city,
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });

  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const startDate = body.data.startDate;
  const endDate = body.data.endDate;
  const city = body.data.city;

  if (startDate && endDate) {
    const days = diffDays(startDate, endDate);
    if (!days) return res.json({ error: 'Data Inválida' });
  }

  const existingData = await forecast.filterCity(city, startDate, endDate);

  if (!existingData) {
    const data = await forecast.getWeatherForecast(city);
    if (data) {
      await forecast.updateDB(data, city);
      const filter = await forecast.filterCity(
        data[0].name,
        startDate,
        endDate
      );
      return res.json(filter);
    }
  }

  return res.json(existingData);
};

export const searchCity: RequestHandler = async (req, res) => {
  const body = FilterSchema.safeParse({
    city: req.body.city,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
  });

  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const startDate = body.data.startDate;
  const endDate = body.data.endDate;
  const city = body.data.city;

  if (startDate && endDate) {
    const days = diffDays(startDate, endDate);
    if (!days) return res.json({ error: 'Data Inválida' });
  }

  const existingData = await forecast.filterCity(city, startDate, endDate);

  if (!existingData) {
    const data = await forecast.getWeatherForecast(city);
    if (data) {
      await forecast.updateDB(data, data[0].name);
      const filter = await forecast.filterCity(
        data[0].name,
        startDate,
        endDate
      );
      return res.json(filter);
    }
  }

  return res.json(existingData);
};
