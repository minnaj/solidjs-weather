import { LocationWeather } from "../types/weather";

type GetForecastParams = {
  latitude: number;
  longitude: number;
};

export async function getForecast({ latitude, longitude }: GetForecastParams) {
  if (isNaN(latitude) || isNaN(longitude)) {
    console.warn("Invalid parameters received");
    return null;
  }
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${latitude},${longitude}&aqi=no`,
  );
  const result: LocationWeather = await response.json();
  return result;
}
