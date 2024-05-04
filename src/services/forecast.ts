import { db } from '../database/prisma';
import { FormatWeather } from '../utils/formatWeather';
import { ForecastCurrentData } from '../types/forecast';

export const getWeatherData = async (
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

export const findCity = async (
  city: string
): Promise<ForecastCurrentData | false> => {
  try {
    const result = await db.forecastCurrent.findFirst({
      where: { name: city },
    });

    return result;
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
       ...data
      },
    });

    return result;
  } catch (error) {
    return false;
  }
};
