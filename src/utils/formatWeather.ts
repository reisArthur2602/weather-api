import { ForecastCurrentData } from '../types/forecast';

export const FormatWeather = (data: any): ForecastCurrentData => {
  return {
    name: data.location.name,
    region: data.location.region,
    country: data.location.country,
    date: new Date(data.forecast.forecastday[0].date),
    maxtemp_c: data.forecast.forecastday[0].day.maxtemp_c,
    maxtemp_f: data.forecast.forecastday[0].day.maxtemp_f,
    mintemp_c: data.forecast.forecastday[0].day.mintemp_c,
    mintemp_f: data.forecast.forecastday[0].day.mintemp_f,
    avgtemp_c: data.forecast.forecastday[0].day.avgtemp_c,
    avgtemp_f: data.forecast.forecastday[0].day.avgtemp_f,
  };
};
