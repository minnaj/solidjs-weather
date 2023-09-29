import { Show, createSignal, onMount } from "solid-js";
import Card from "./components/Card";

function App() {
  const [locationQueryResponded, setLocationQueryResponded] = createSignal<boolean>(false);
  const [position, setPosition] = createSignal<GeolocationPosition | null>(null);

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

  return (
    <div class="w-screen h-screen  bg-gradient-to-b from-indigo-900 to-indigo-950">
      <div class="container max-w-3xl mx-auto p-4 flex flex-col gap-4">
        <Show when={locationQueryResponded()} fallback={<Card>Hyväksy paikannus</Card>}>
          <Show when={position()} fallback={<Card error>Paikannus estetty</Card>}>
            <Card>{`Sijainti: ${position()?.coords.latitude}, ${position()?.coords
              .longitude}`}</Card>
          </Show>
        </Show>
      </div>
    </div>
  );
}

export default App;
