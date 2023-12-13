import { Position } from "../types/location";
import { LocationWeather } from "../types/weather";

async function getForecast({ latitude, longitude }: Position): Promise<LocationWeather>;
async function getForecast(id: string): Promise<LocationWeather>;
async function getForecast(param: Position | string) {
  let query = "";
  if (typeof param === "string") {
    const numberParam = Number.parseInt(param);
    if (Number.isNaN(numberParam)) {
      throw new Error("Invalid parameters received");
    }
    query = `q=id:${param}`;
  } else {
    if (isNaN(param.latitude) || isNaN(param.longitude)) {
      throw new Error("Invalid parameters received");
    }
    query = `q=${param.latitude},${param.longitude}`;
  }

  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&${query}&aqi=no`,
  );
  const result: LocationWeather = await response.json();
  return result;
}

export default getForecast;
