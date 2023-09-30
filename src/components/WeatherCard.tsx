import { LocationWeather } from "../types/weather";
import Card from "./Card";

type WeatherCardProps = {
  data: LocationWeather;
};

function WeatherCard({ data }: WeatherCardProps) {
  return (
    <Card title={data.location.name} subtitle={`${data.location.region}, ${data.location.country}`}>
      <div class="flex gap-4">
        <div class="flex-1">
          <div class="flex gap-1 items-center">
            <img src={data.current.condition.icon} alt={data.current.condition.text} />
            <span class="text-lg">{data.current.condition.text}</span>
          </div>
          <div>{`Precipitation: ${data.current.precip_mm} mm`}</div>
          <div>{`Humidity: ${data.current.humidity} %`}</div>
          <div>{`Wind: ${data.current.wind_kph} km/h`}</div>
          <div>{`Pressure: ${data.current.pressure_mb} mbar`}</div>
          <div>{`UV: ${data.current.uv}`}</div>
        </div>
        <div class="flex-initial flex flex-col items-end justify-start">
          <span class="text-4xl">{`${data.current.temp_c} `}&deg;C</span>
          <span class="text-sm">{`Feels like ${data.current.feelslike_c} `}&deg;C</span>
        </div>
      </div>
    </Card>
  );
}

export default WeatherCard;
