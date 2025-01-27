import Container from './components/Container';
import Box from './components/Box';
import Header from './components/Header';
import Logo from './components/Logo';
import Result from './components/Result';
import Search from './components/Search';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchedMovieList from './components/WatchedMovieList';
import { useEffect, useState } from 'react';
import Loader from './components/Loader';

const KEY = '2f74e8e2';
function App() {
  const [query, setQuery] = useState('harry');
  const [movies, setMovies] = useState();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [selected, setSelected] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function handleSeleted(id) {
    setSelected((selected) => (selected === id ? '' : id));
  }
  useEffect(
    function () {
      const controller = new AbortController();
      async function fetchMovies() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          {
            signal: controller.signal,
          }
        );
        const data = await res.json();
        setMovies(data.Search);
        setIsLoading(false);
      }
      fetchMovies();
      return function(){
        controller.abort();
      }
    },

    [query]
  );
  return (
    <>
      <div>
        <Header>
          <Logo />
          <Search query={query} setQuery={setQuery} />
          <Result movies={movies} />
        </Header>
        <Container>
          <Box>
            {isLoading ? (
              <Loader />
            ) : (
              <MovieList movies={movies} onSelect={handleSeleted} />
            )}
          </Box>
          <Box>
            {selected ? (
              !isLoading ? (
                <MovieDetails
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  setWatchedMovies={setWatchedMovies}
                  selected={selected}
                  setSelected={setSelected}
                />
              ) : (
                <Loader />
              )
            ) : (
              <WatchedMovieList
                watchedMovies={watchedMovies}
                setWatchedMovies={setWatchedMovies}
              />
            )}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default App;
