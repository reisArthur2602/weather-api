import { RequestHandler } from 'express';
import * as forecast from '../services/forecast';
import { CitySchema } from '../schemas/forecast';
import { getCurrentDate } from '../utils/getCurrentDate';

export const getByCity: RequestHandler = async (req, res) => {
  const body = CitySchema.safeParse({ city: req.query.city });
  if (!body.success) return res.json({ error: 'Dado Inválido' });

  const existingData = await forecast.findCity(body.data.city);

  if (!existingData) {
    const data = await forecast.getWeatherData(body.data.city);
    if (data) {
      const saved = await forecast.save({ ...data });
      console.log('Dados salvos no banco de dados');
      return res.json(saved);
    }
  }

  if (existingData) {
    const currentDate = getCurrentDate();
    if (existingData.date !== currentDate) {
      const data = await forecast.getWeatherData(body.data.city);

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
