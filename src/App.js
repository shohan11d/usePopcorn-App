// import { NavBar, Search, NumResults, Logo } from './components/NavBar';
import { useEffect, useState } from 'react';
import { NavBar, Logo, NumResults, Search } from './components/Navigation';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import Movie from './components/Movie';
import WatchList from './components/WatchList';
import MovieDetails from './components/MovieDetails';

const KEY = '2f74e8e2';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState('');

  function handleSelect(id) {
    selected === id ? setSelected('') : setSelected(id);
  }
  // console.log(selected)
  useEffect(
    function () {
      async function fetchMovies() {
        fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`).then((res) =>
          res.json().then((data) => setMovies(data.Search))
        );
      }

      fetchMovies();
    },
    [query]
  );

  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          <MovieList
            movies={movies}
            onSelect={handleSelect}
            setSelected={setSelected}
          />
        </Box>
        <Box>
          <WatchList />
          <MovieDetails selected={selected} KEY={KEY} />
        </Box>
      </Main>
    </>
  );
}

export default App;
