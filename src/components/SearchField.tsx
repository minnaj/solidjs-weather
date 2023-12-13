import { Accessor, Setter, createEffect, createSignal } from "solid-js";
import { A } from "@solidjs/router";
import useDebounce from "../hooks/useDebounce";
import { ResultOption } from "../types/search";

enum Key {
  ArrowDown = "ArrowDown",
  ArrowUp = "ArrowUp",
  Enter = "Enter",
}

type SearchFieldProps = {
  debounced: boolean;
  input: Accessor<string>;
  setInput: Setter<string>;
  options?: Accessor<ResultOption[]>;
};

function SearchField({ input, setInput, debounced, options }: SearchFieldProps) {
  const [selectedOptionIndex, setSelectedOptionIndex] = createSignal<number | null>(null);
  const [listRef, setListRef] = createSignal<HTMLUListElement | null>(null);

  const resetSelectedOption = () => setSelectedOptionIndex(null);

  const handleInput = debounced ? useDebounce(setInput, 800) : setInput;

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!options || options().length === 0 || !Object.keys(Key).includes(e.key)) {
      return;
    }
    e.preventDefault();
    if (e.key === Key.ArrowDown) {
      if (selectedOptionIndex() === null || selectedOptionIndex()! + 1 >= options().length) {
        setSelectedOptionIndex(0);
      } else {
        setSelectedOptionIndex(selectedOptionIndex()! + 1);
      }
    }
    if (e.key === Key.ArrowUp) {
      if (selectedOptionIndex() === null || selectedOptionIndex()! === 0) {
        setSelectedOptionIndex(options().length - 1);
      } else {
        setSelectedOptionIndex(selectedOptionIndex()! - 1);
      }
    }
    if (e.key === Key.Enter && selectedOptionIndex() !== null) {
      const childNodes = listRef()!.childNodes;
      const selectedChild = childNodes[selectedOptionIndex()!];
      const link = selectedChild.childNodes[0] as HTMLElement;
      link.click();
    }
  };

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
          ref={(el) => setListRef(el)}
        >
          {options().map((option, index) => (
            <li>
              <A href={option.href} tabIndex={0}>
                <div
                  class={`px-4 py-2 hover:bg-sky-600 active:bg-sky-600 focus:bg-sky-600 cursor-pointer ${
                    index === selectedOptionIndex() ? "bg-sky-600" : ""
                  }`}
                >
                  <div>{option.title}</div>
                  <div class="text-sm">{option.description}</div>
                </div>
              </A>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchField;
