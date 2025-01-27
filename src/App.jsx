import Container from './components/Container';
import Box from './components/Box';
import Header from './components/Header';
import Logo from './components/Logo';
import Result from './components/Result';
import Search from './components/Search';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import WatchedMovieList from './components/WatchedMovieList';
import { useState } from 'react';
import Loader from './components/Loader';
import useMovies from './hooks/useMovies';
import useStorage from './hooks/useStorage';

function App() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState('');
  const [movies, isLoading] = useMovies(query);
  const [value, setValue] = useStorage([], 'watched');

  function handleSeleted(id) {
    setSelected((selected) => (selected === id ? '' : id));
  }
  function handleSubmit(selectedMovie) {
    setValue((value) => [...value, selectedMovie]);
    setSelected('');
  }

  function handleDelete(id) {
    setValue((movies) => movies.filter((mov) => mov.imdbID !== id));
  }
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
                  selected={selected}
                  onSubmit={handleSubmit}
                />
              ) : (
                <Loader />
              )
            ) : (
              <WatchedMovieList
                onDelete={handleDelete}
                watchedMovies={value}
              />
            )}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default App;
