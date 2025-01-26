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

const tempMovieData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '196-10-14',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt0133093',
    Title: 'The Matrix',
    Year: '1999-03-22',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg',
  },
  {
    imdbID: 'tt6751668',
    Title: 'Parasite',
    Year: '2019-06-30',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg',
  },
];

const tempWatchedData = [
  {
    imdbID: 'tt1375666',
    Title: 'Inception',
    Year: '2010',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: 'tt0088763',
    Title: 'Back to the Future',
    Year: '1985',
    Poster:
      'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const KEY = '2f74e8e2';
function App() {
  const [query, setQuery] = useState('harry');
  const [movies, setMovies] = useState();
  const [watchedMovies, setWatchedMovies] = useState([]);
  const [selected, setSelected] = useState('');

  function handleSeleted(id) {
    setSelected((selected) => (selected === id ? '' : id));
  }
  useEffect(
    function () {
      async function fetchMovies() {
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`
        );
        const data = await res.json();
        setMovies(data.Search);
      }
      fetchMovies();
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
            <MovieList movies={movies} onSelect={handleSeleted} />
          </Box>
          <Box>
            {selected ? (
              <MovieDetails
                data={tempWatchedData}
                setWatchedMovies={setWatchedMovies}
                selected={selected}
                setSelected={setSelected}
              />
            ) : (
              <WatchedMovieList
                data={tempWatchedData}
                watchedMovies={watchedMovies}
                setWatchedMovies={setWatchedMovies}
              />
            )}
            {/* <WatchedMovieList data={tempWatchedData} /> */}
            {/* <MovieDetails data={tempWatchedData} /> */}
          </Box>
        </Container>
      </div>
    </>
  );
}

export default App;
