import { useEffect } from "react";
import { useState } from "react";

const movieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const watchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,         
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];
const KEY = "2f74e8e2";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(
    function () {
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        console.log(data);
        data.Response === "False"? setMovies([]):setMovies(data.Search);
        setIsLoading(false);
      }

      fetchMovies();
    },
    [query]
  );
  return (
    <div className="mx-2 mt-2 text-white">
      <Nav>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <Results movies={movies} />
      </Nav>
      <Main>
        <Box>
          <MovieList
            movies={movies}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        </Box>
        <Box>
          <MoviesSummary watchedData={watchedData} />
          <WatchedMovie watchedData={watchedData} />
        </Box>
      </Main>
    </div>
  );
}

function average(arr) {
  return arr.reduce((acc, cur, i, array) => acc + cur / array.length, 0);
}

function Nav({ children }) {
  return (
    <nav className="bg-[#6741D9] min-h-20 rounded-md flex flex-col space-y-4  items-center px-5 justify-between py-4 md:flex-row">
      {children}
    </nav>
  );
}
function Logo() {
  return (
    <div className="flex items-center">
      <span>
        <img src="./popcorn-logo.png" alt="website logo" />
      </span>
      <h1 className="text-xl font-bold">MediaFlix</h1>
    </div>
  );
}

function Search({ query, setQuery }) {
  return (
    <div className="flex ">
      <input
        className="p-2  bg-[#7950F2] pl-2 rounded-md"
        placeholder="Search movies..."
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
}

function Results({movies}) {
  return (
    <div className="">
      <p>
        Found <span className="font-bold">{movies.length}</span> results
      </p>
    </div>
  );
}
/* Nav End*/

function Main({ children }) {
  return (
    <div className="flex flex-col items-center  bg-[#212529] md:flex-row gap-5 justify-center rounded-md">
      {children}
    </div>
  );
}
function Box({ children }) {
  return (
    <div className=" h-[400px] w-72 overflow-scroll  bg-[#2B3035] my-5 p-5 rounded-md md:w-[400px] md:h-[800px]">
      {children}
    </div>
  );
}

function MovieList({ movies, isLoading, setIsLoading }) {
  return <div>
   {isLoading ? <Loader />: (
      <div>
      {movies.map((mov) => (
        <Movie mov={mov} key={mov.imdbID} />
      ))}
    </div>)
    }
  </div>
}
function Loader() {
  return <p className="text-lg text-center">LOADING...</p>;
}
function Movie({ mov }) {
  return (
    <div className="flex items-center gap-5 mt-5 border-b border-neutral-600 pb-5">
      <img src={mov.Poster} className="h-16" alt={`${mov.Title} poster`} />
      <div className="space-y-2">
        <h3>{mov.Title}</h3>
        <p>
          <span>🗓 </span>
          <span className="ml-2">{mov.Year}</span>
        </p>
      </div>
    </div>
  );
}

function MoviesSummary({ watchedData }) {
  return (
    <div className="bg-violet-800 rounded-md px-2 py-5">
      <h1 className="uppercase text-md">Movies You Watched</h1>
      <div className="flex gap-5">
        <p className="space-x-2">
          <span>🎞️ movies: {watchedData.length}</span>
        </p>
        <p className="space-x-2">
          <span>⭐️ {watchedData.map((el) => el.imdbRating)}</span>
        </p>
        <p className="space-x-2">
          <span>🌟</span>
          <span>7.00</span>
        </p>
        <p className="space-x-2">
          <span>⌛️ 148</span>
        </p>
      </div>
    </div>
  );
}

function WatchedMovie({ watchedData }) {
  return (
    <div>
      {watchedData.map((mov) => (
        <Movie mov={mov} key={mov.imdbID} />
      ))}
    </div>
  );
}

function Movie2({ mov }) {
  return (
    <div className="flex items-center gap-5 mt-5 border-b border-neutral-500 pb-5">
      <img src={mov.Poster} className="h-16" alt={`${mov.Title} poster`} />
      <div className="space-y-2">
        <h3>{mov.Title}</h3>
        <p>
          <span>🗓 </span>
          <span className="ml-2">{mov.Year}</span>
        </p>
      </div>
    </div>
  );
}
