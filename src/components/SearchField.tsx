function SearchField() {
  return (
    <div class="flex h-10">
      <input
        type="text"
        id="city-search"
        name="city-search"
        class="flex-1 rounded-l-md px-4"
        placeholder="Search for city"
      />
      <button class="bg-sky-600 hover:bg-sky-500 px-4 align-middle rounded-r-md text-white">
        Search
      </button>
    </div>
  );
}

export default SearchField;
