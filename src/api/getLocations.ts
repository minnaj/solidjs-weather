import { LocationResult } from "../types/location";

export async function getLocations(query: string) {
  if (!query) {
    console.error("Invalid parameter received");
    return null;
  }
  const response = await fetch(
    `https://api.weatherapi.com/v1/search.json?key=${
      import.meta.env.VITE_WEATHER_API_KEY
    }&q=${query}&aqi=no`,
  );
  const result: LocationResult[] = await response.json();
  return result;
}
