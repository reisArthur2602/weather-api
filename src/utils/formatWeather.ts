import { ForecastCurrentData } from '../types/forecast';

export const FormatWeather = (data: any): ForecastCurrentData => {
  return {
    name: data.location.name.toLocaleLowerCase(),
    region: data.location.region,
    country: data.location.country,
    temp_c: data.current.temp_c,
    temp_f: data.current.temp_f,
    is_day: data.current.is_day,
    last_updated: data.current.last_updated,
    wind_degree: data.current.wind_degree,
    wind_kph: data.current.wind_kph,
    pressure_mb: data.current.pressure_mb,
    pressure_in: data.current.pressure_in,
    precip_mm: data.current.precip_mm,
    precip_in: data.current.precip_in,
    humidity: data.current.humidity,
    feelslike_c: data.current.feelslike_c,
    feelslike_f: data.current.feelslike_f,
  };
};
