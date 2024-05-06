import { db } from '../database/prisma';
import { FormatWeather } from '../utils/formatWeather';
import { ForecastCurrentData } from '../types/forecast';
import { getCurrentDate } from '../utils/Date';

export const getWeatherForecast = async (
  city: string
): Promise<ForecastCurrentData[] | false> => {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=8&aqi=no&alerts=no`
    );
    const response = await data.json();

    const forecasts: ForecastCurrentData[] = [];

    response.forecast.forecastday.forEach((weather: any) =>
      forecasts.push({
        name: response.location.name,
        country: response.location.country,
        region: response.location.region,
        date: new Date(weather.date),
        maxtemp_c: weather.day.maxtemp_c,
        maxtemp_f: weather.day.maxtemp_f,
        mintemp_c: weather.day.mintemp_c,
        mintemp_f: weather.day.mintemp_f,
        avgtemp_c: weather.day.avgtemp_c,
        avgtemp_f: weather.day.avgtemp_f,
      })
    );

    return forecasts;
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    return false;
  }
};

export const findWeatherCurrent = async (
  city: string
): Promise<ForecastCurrentData | false> => {
  try {
    const currentDate = new Date(getCurrentDate());

    const result = await db.forecastCurrent.findFirst({
      where: { name: city, date: currentDate },
    });

    return result || false;
  } catch (error) {
    console.error('Erro ao obter dados do banco:', error);
    return false;
  }
};

export const filterCity = async (
  city?: string,
  startDate?: Date,
  endDate?: Date
): Promise<ForecastCurrentData[] | false> => {
  try {
    const filter = {
      ...(startDate && { date: { gte: startDate } }),
      ...(endDate && { date: { lte: endDate } }),
      ...(city && { name: city }),
    };

    const result = await db.forecastCurrent.findMany({
      where: filter,
    });

    return result.length > 0 ? result : false;
  } catch (error) {
    console.error('Erro ao obter dados do banco:', error);
    return false;
  }
};

export const updateDB = async (data: ForecastCurrentData[], city: string) => {
  try {
    await db.forecastCurrent.deleteMany({
      where: { name: city },
    });
    await saveForecast(data);
    console.log('Dados salvos no banco de dados');
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    return false;
  }
};

export const saveForecast = async (data: ForecastCurrentData[]) => {
  try {
    await db.forecastCurrent.createMany({
      data: data,
    });
    console.log('Dados salvos no banco de dados');
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    return false;
  }
};
