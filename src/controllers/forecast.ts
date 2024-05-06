import { Request, RequestHandler, Response } from 'express';
import * as forecast from '../services/forecast';
import { CitySchema, FilterSchema } from '../schemas/forecast';
import { diffDays, filterByDate, getCurrentDate } from '../utils/Date';

export const getByCity: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const body = CitySchema.safeParse({ city: req.params.city });
  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const existingData = await forecast.findCity(body.data.city);

  if (!existingData) {
    const data = await forecast.getWeatherCurrent(body.data.city);
    if (data) {
      const saved = await forecast.save({ ...data });
      console.log('Dados salvos no banco de dados');
      return res.json(saved);
    }
  }

  if (existingData) {
    const currentDate = getCurrentDate();
    if (existingData.date !== currentDate) {
      const data = await forecast.getWeatherCurrent(body.data.city);

      if (data) {
        const updated = await forecast.updateCity({
          id: existingData.id,
          ...data,
        });
        console.log('Dados da previsão do tempo atualizados no banco de dados');
        return res.json(updated);
      }
    }
    return res.json(existingData);
  }
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
      const filter = await forecast.filterCity(city, startDate, endDate);
      return res.json(filter);
    }
  }

  return res.json(existingData);
};
