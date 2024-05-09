import { useEffect, useRef } from "react";
import { useState } from "react";
import StarRating from "./StarRating";

const KEY = "2f74e8e2";
export default function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watched, setWatched] = useState([]);

  function handleSelect(id) {
    setSelectedId((curId) => (id === curId ? null : id));
  }

  useEffect(
    function () {
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        data.Response === "False" ? setMovies([]) : setMovies(data.Search);
        setIsLoading(false);
      }

      fetchMovies();
    },
    [query]
  );

  useEffect(
    function () {
      async function fetchMovieDetails() {
        const data = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const res = await data.json();

        setSelectedMovie(() => (res.Response === "False" ? null : res));
      }
      fetchMovieDetails();
    },
    [selectedId]
  );
  function handleTest(){
    setSelectedMovie(null)
  }
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
            onSelect={handleSelect}
          />
        </Box>
        <Box>
          {selectedMovie ? (
            <MovieDetails
              selectedMovie={selectedMovie}
              setSelectedMovie={setSelectedMovie}
              setWatched={setWatched}
            />
          ) : (
            <>
              <MoviesSummary watched={watched} />
              <WatchedMovie
                watchedData={watched}
                setWatched={setWatched}
                watched={watched}
                onSelect={handleSelect}
              />
            </>
          )}
        </Box>
        <Clear handleTest={handleTest}/>
      </Main>
    </div>
  );
}

function Clear({handleTest}){
  return <button onClick={handleTest}>x</button>
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
  const inputEl = useRef(null);
   

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

function Results({ movies }) {
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

function MovieList({ movies, isLoading, setIsLoading, onSelect }) {
  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {movies.map((mov) => (
            <Movie mov={mov} onSelect={onSelect} key={mov.imdbID} />
          ))}
        </div>
      )}
    </div>
  );
}
function Loader() {
  return <p className="text-lg text-center">LOADING...</p>;
}
function Movie({ mov, onSelect }) {
  return (
    <div
      onClick={() => onSelect(mov.imdbID)}
      className=" cursor-pointer duration-500 rounded-md hover:bg-[#7950f22c] flex items-center gap-5 mt-5 border-b border-neutral-600 pb-5"
    >
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
function MoviesSummary({ watched }) {
  return (
    <div className="bg-[#6741D9] rounded-md px-2 py-5">
      <h1 className="uppercase text-md">Movies You Watched</h1>
      <div className="flex gap-5">
        <p className="space-x-2">
          <span>🎞️ movies: {watched.length}</span>
        </p>
        <p className="space-x-2">
          {/* <span>⭐️ {watched.map((el) => el.imdbRating)}</span> */}
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

function WatchedMovie({  onSelect, watched, setWatched }) {
  return (
    <div>
      {watched.map((mov) => (
        <Movie2
          mov={mov}
          onSelect={onSelect}
          setWatched={setWatched}
          key={crypto.randomUUID()}
        />
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
         <div className="flex gap-4">
          <p>
            <span> ⭐️ {mov.imdbRating}</span>
          </p>
          <p>
            <span> 🌟️ {mov.userRating}</span>

          </p>
          <p>
            <span> 🕧️ {mov.Runtime}</span>

          </p>
         </div>
        </div>
      </div>
    );
}
function MovieDetails({
  selectedMovie,
  watched,
  setWatched,
  setSelectedMovie,
}) {
  const [rating, setRating] = useState(0);
  const { imdbRating, Runtime, Title, Poster } = selectedMovie;
  function handleSetRating(userRating) {
    setRating((rating) => userRating);
    setWatched((watched) => [
      ...watched,
      { imdbRating, Runtime, Title, Poster, userRating: rating },
    ]);
  }
  return (
    <div className="">
      <div className="grid place-items-center grid-cols-2 bg-[#343A40]">
      {/* <button className="p-2 bg-blue-600 rounded" onClick={setSelectedMovie(null)}>x</button> */}
        {" "}
        <img
          src={selectedMovie.Poster}
          className="w-[80%] justify-self-start"
          alt=""
        />{" "}
        <div className="p-4 justify-self-center space-y-2">
          {" "}
          <h1 className="text-2xl">{selectedMovie.Title}</h1>{" "}
          <p>
            <span>
              {selectedMovie.Released} {selectedMovie.Runtime}
            </span>
          </p>{" "}
          <p>{selectedMovie.Genre}</p>{" "}
          <p>⭐️ {selectedMovie.imdbRating} IMDB rating </p>{" "}
        </div>{" "}
      </div>{" "}
      <StarRating
        className="mt-5 flex justify-center"
        onSetRating={handleSetRating}
        maxRating={10}
        size={24}
      />
      <p className="mt-5 text-justify">{selectedMovie.Plot}</p>
    </div>
  );
}
