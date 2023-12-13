import { Show, createEffect, createSignal, onMount } from "solid-js";
import getForecast from "../api/getForecast";
import { getLocations } from "../api/getLocations";
import { LocationWeather } from "../types/weather";
import { ResultOption } from "../types/search";
import Card from "../components/Card";
import WeatherCard from "../components/WeatherCard";
import SearchField from "../components/SearchField";

function Frontpage() {
  const [locationQueryResponded, setLocationQueryResponded] = createSignal<boolean>(false);
  const [position, setPosition] = createSignal<GeolocationPosition | null>(null);
  const [forecast, setForecast] = createSignal<LocationWeather | null>(null);
  const [searchInput, setSearchInput] = createSignal<string>("");
  const [searchResults, setSearchResults] = createSignal<ResultOption[]>([]);

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

  createEffect(async () => {
    if (searchInput()?.length > 2) {
      const locations = await getLocations(searchInput());
      const options = (locations || []).map((location) => ({
        title: location.name,
        description: `${location.region}, ${location.country}`,
        href: `/location/${location.id}`,
      }));
      setSearchResults(options);
    }
  });

  return (
    <div class="container max-w-3xl mx-auto p-4 flex flex-col gap-4">
      <SearchField
        input={searchInput}
        setInput={setSearchInput}
        debounced
        options={searchResults}
      />
      <Card error={locationQueryResponded() && !position()} title="Your location">
        <Show when={locationQueryResponded()} fallback="Allow geolocation">
          <Show when={position()} fallback="Geolocation failed">
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
