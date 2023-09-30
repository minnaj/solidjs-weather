type Condition = {
  icon: string;
  text: string;
};

type Weather = {
  cloud: number;
  feelslike_c: number;
  humidity: number;
  temp_c: number;
  uv: number;
  wind_kph: number;
  condition: Condition;
  precip_mm: number;
  pressure_mb: number;
};

type Location = {
  country: string;
  lat: number;
  lon: number;
  name: string;
  region: string;
  localtime: string;
};

export type LocationWeather = {
  current: Weather;
  location: Location;
};
