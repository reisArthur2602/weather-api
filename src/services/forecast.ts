import { db } from '../database/prisma';
import { FormatWeather } from '../utils/formatWeather';
import { ForecastCurrentData } from '../types/forecast';

export const getWeatherCurrent = async (
  city: string
): Promise<ForecastCurrentData | false> => {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    );
    const response = await data.json();
    return FormatWeather(response);
  } catch (error) {
    console.error('Erro ao obter dados da API:', error);
    return false;
  }
};

export const getWeatherForecast = async (
  city: string,
  days: string
): Promise<ForecastCurrentData[] | false> => {
  console.log(city, days);
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=${days}&aqi=no&alerts=no`
    );
    const response = await data.json();

    const forecasts: ForecastCurrentData[] = [];

    response.forecast.forecastday.forEach((weather: any) =>

      forecasts.push({
        name: response.location.name,
        country: response.location.country,
        region: response.location.region,
        date: weather.date,
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

export const findCity = async (
  city: string
): Promise<ForecastCurrentData | false> => {
  try {
    const result = await db.forecastCurrent.findFirst({
      where: { name: city },
    });

    return result || false;
  } catch (error) {
    console.error('Erro ao obter dados do banco:', error);
    return false;
  }
};

export const findCitybyDate = async (
  city: string,
  startDate: string,
  endDate: string
): Promise<ForecastCurrentData[] | false> => {
  try {
    const result = await db.forecastCurrent.findMany({
      where: {
        name: city,
        date: {
          gte: startDate,
          lte: endDate,
        },
      },
    });

    return result || false;
  } catch (error) {
    console.error('Erro ao obter dados do banco:', error);
    return false;
  }
};

export const save = async (
  data: ForecastCurrentData
): Promise<ForecastCurrentData | false> => {
  try {
    const result = await db.forecastCurrent.create({
      data: {
        ...data,
      },
    });
    console.log('Dados salvos no banco de dados');
    return result;
  } catch (error) {
    console.error('Erro ao salvar no banco de dados:', error);
    return false;
  }
};

export const updateCity = async (
  data: ForecastCurrentData
): Promise<ForecastCurrentData | false> => {
  try {
    const result = await db.forecastCurrent.update({
      where: { id: data.id },
      data: {
        ...data,
      },
    });

    return result;
  } catch (error) {
    return false;
  }
};
