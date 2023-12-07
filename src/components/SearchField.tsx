import { Accessor, Setter } from "solid-js";
import useDebounce from "../hooks/useDebounce";

type SearchFieldProps = {
  debounced: boolean;
  input: Accessor<string>;
  setInput: Setter<string>;
};

function SearchField({ input, setInput, debounced }: SearchFieldProps) {
  const handleInput = debounced ? useDebounce(setInput, 800) : setInput;

  return (
    <div class="flex h-10">
      <input
        type="text"
        id="city-search"
        name="city-search"
        class="flex-1 rounded-md px-4"
        placeholder="Search for city"
        value={input()}
        onInput={(e) => handleInput(e.currentTarget.value)}
      />
    </div>
  );
}

export default SearchField;
