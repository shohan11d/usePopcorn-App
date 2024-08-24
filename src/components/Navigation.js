export { NavBar, Logo, NumResults, Search };

// Main Nav Component
function NavBar({ children }) {
  return <div className="nav-bar">{children}</div>;
}

// Logo Component for Nav Area
function Logo() {
  return (
    <div className="">
      <h3>usePopcorn</h3>
    </div>
  );
}

// Search Component for Nav Area
function Search({ query, setQuery }) {
  return (
    <input
      type="text"
      className="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}

// Results Component for Nav Area
function NumResults() {
  return (
    <div>
      <p>Found {3} movies</p>
    </div>
  );
}