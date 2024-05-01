import { FormatWeather } from '../utils/formatWeather';

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
