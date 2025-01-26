function Search({ query, setQuery }) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className=" px-3 text-lg w-[400px]   rounded-md bg-[#7950f2] text-neutral-800 py-2"
      />
    </div>
  );
}

export default Search;
