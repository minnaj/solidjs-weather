import { Show, createEffect, createSignal, onMount } from "solid-js";
import Card from "../components/Card";
import { getForecast } from "../api/getForecast";
import { LocationWeather } from "../types/weather";
import WeatherCard from "../components/WeatherCard";
import SearchField from "../components/SearchField";

function Frontpage() {
  const [locationQueryResponded, setLocationQueryResponded] = createSignal<boolean>(false);
  const [position, setPosition] = createSignal<GeolocationPosition | null>(null);
  const [forecast, setForecast] = createSignal<LocationWeather | null>(null);

  onMount(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosition(position);
          setLocationQueryResponded(true);
        },
        (error) => {
          console.warn(`ERROR(${error.code}): ${error.message}`);
          setLocationQueryResponded(true);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        },
      );
    } else {
      console.log("Geolocation is not available");
    }
  });

  createEffect(async () => {
    if (position()) {
      const data = await getForecast({
        latitude: position()!.coords.latitude,
        longitude: position()!.coords.longitude,
      });
      setForecast(data);
    }
  });

  return (
    <div class="container max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <SearchField />
      <Card error={locationQueryResponded() && !position()} title="Your location">
        <Show when={locationQueryResponded()} fallback={"Allow geolocation"}>
          <Show when={position()} fallback={"Geolocation failed"}>
            <div>{`Latitude: ${position()?.coords.latitude}`}</div>
            <div>{`Longitude: ${position()?.coords.longitude}`}</div>
          </Show>
        </Show>
      </Card>
      <Show when={forecast()}>
        <WeatherCard data={forecast()!} />
      </Show>
    </div>
  );
}

export default Frontpage;
