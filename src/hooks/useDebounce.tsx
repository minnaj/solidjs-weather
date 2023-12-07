import { onCleanup } from "solid-js";

function useDebounce<Args>(callback: (args: Args) => void, delay: number) {
  let timeoutId: number;

  const debouncedSetter: typeof callback = (...args) => {
    if (timeoutId !== undefined) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => callback(...args), delay);
  };

  onCleanup(() => clearTimeout(timeoutId));

  return debouncedSetter;
}

export default useDebounce;
