import { Show, createResource } from "solid-js";
import { useParams } from "@solidjs/router";
import getForecast from "../api/getForecast";
import WeatherCard from "../components/WeatherCard";

function Location() {
  const params = useParams();
  const [weatherData] = createResource(params.id, getForecast);

  return (
    <div class="container max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <Show when={weatherData()}>
        <WeatherCard data={weatherData()!} />
      </Show>
    </div>
  );
}

export default Location;
