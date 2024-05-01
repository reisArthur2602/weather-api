import { prismaClient } from '../database/prisma';
import { FormatWeather } from '../utils/formatWeather';
import { ForecastCurrentData } from '../types/forecast';

export const getCity = async (city: string) => {
  try {
    const data = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}&aqi=no`
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
        country: data.country,
        region: data.region,
        is_day: data.is_day,
        temp_c: data.temp_c,
        temp_f: data.temp_f,
        feelslike_c: data.feelslike_c,
        feelslike_f: data.feelslike_f,
        humidity: data.humidity,
        precip_in: data.precip_in,
        precip_mm: data.precip_mm,
        pressure_in: data.pressure_in,
        pressure_mb: data.pressure_mb,
        wind_degree: data.wind_degree,
        wind_kph: data.wind_kph,
        last_updated: data.last_updated,
      },
    });

    return result;
  } catch (error) {
    return false;
  }
};
