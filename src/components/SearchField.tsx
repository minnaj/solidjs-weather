import { Accessor, Setter } from "solid-js";
import useDebounce from "../hooks/useDebounce";
import { ResultOption } from "../types/search";

type SearchFieldProps = {
  debounced: boolean;
  input: Accessor<string>;
  setInput: Setter<string>;
  options?: Accessor<ResultOption[]>;
};

function SearchField({ input, setInput, debounced, options }: SearchFieldProps) {
  const handleInput = debounced ? useDebounce(setInput, 800) : setInput;

  return (
    <div class="flex relative text-white">
      <input
        type="search"
        id="city-search"
        name="city-search"
        class="h-10 flex-1 px-4 bg-slate-900"
        placeholder="Search for city"
        value={input()}
        onInput={(e) => handleInput(e.currentTarget.value)}
      />
      {options && options() && (
        <ul
          id="city-search-results"
          class="absolute bg-slate-900 top-10 w-full shadow-2xl border-t border-slate-700"
        >
          {options().map((option) => (
            <li onClick={option.onClick}>
              <div class="px-4 py-2 hover:bg-sky-600 cursor-pointer">
                <div>{option.title}</div>
                <div class="text-sm">{option.description}</div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchField;
