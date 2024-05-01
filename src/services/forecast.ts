import { prismaClient } from '../database/prisma';
import { FormatWeather } from '../utils/formatWeather';
import { ForecastCurrentData } from '../types/forecast';

export const getCity = async (city: string) => {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${city}&days=1&aqi=no&alerts=no`
    );
    const response = await data.json();
    return FormatWeather(response);
  } catch (error) {
    return false;
  }
};

export const findCity = async (
  city: string
): Promise<ForecastCurrentData[] | false> => {
  try {
    const result = await prismaClient.forecastCurrent.findMany({
      where: { name: city },
    });

    return result.length === 0 ? false : result;
  } catch (error) {
    return false;
  }
};

export const save = async (
  data: ForecastCurrentData
): Promise<ForecastCurrentData | false> => {
  try {
    const result = await prismaClient.forecastCurrent.create({
      data: {
        name: data.name,
        region: data.region,
        country: data.country,
        date: data.date,
        maxtemp_c: data.maxtemp_c,
        maxtemp_f: data.maxtemp_f,
        mintemp_c: data.mintemp_c,
        mintemp_f: data.mintemp_c,
        avgtemp_c: data.avgtemp_c,
        avgtemp_f: data.avgtemp_f,
      },
    });

    return result;
  } catch (error) {
    return false;
  }
};
