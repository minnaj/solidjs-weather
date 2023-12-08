import { Accessor, Setter, createSignal } from "solid-js";
import useDebounce from "../hooks/useDebounce";
import { ResultOption } from "../types/search";

type SearchFieldProps = {
  debounced: boolean;
  input: Accessor<string>;
  setInput: Setter<string>;
  options?: Accessor<ResultOption[]>;
};

function SearchField({ input, setInput, debounced, options }: SearchFieldProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = createSignal<number | null>(null);

  const handleInput = debounced ? useDebounce(setInput, 800) : setInput;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!options || options().length === 0) {
      return;
    }
    e.preventDefault();
    if (e.key === "ArrowDown") {
      if (selectedOptionIndex() === null || selectedOptionIndex()! + 1 >= options().length) {
        setSelectedOptionIndex(0);
      } else {
        setSelectedOptionIndex(selectedOptionIndex()! + 1);
      }
    }
    if (e.key === "ArrowUp") {
      if (selectedOptionIndex() === null || selectedOptionIndex()! === 0) {
        setSelectedOptionIndex(options().length - 1);
      } else {
        setSelectedOptionIndex(selectedOptionIndex()! - 1);
      }
    }
    if (e.key === "Enter") {
      // TODO: select location
    }
  };

  const resetSelectedOption = () => setSelectedOptionIndex(null);

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
        onKeyDown={handleKeyDown}
        onFocusOut={resetSelectedOption}
      />
      {options && options() && (
        <ul
          id="city-search-results"
          class="absolute bg-slate-800 top-10 w-full shadow-2xl border-t border-slate-700"
        >
          {options().map((option, index) => (
            <li onClick={option.onClick}>
              <div
                class={`px-4 py-2 hover:bg-sky-600 cursor-pointer ${
                  index === selectedOptionIndex() ? "bg-sky-600" : ""
                }`}
              >
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
