// import { NavBar, Search, NumResults, Logo } from './components/NavBar';
import { useState } from 'react';
import { NavBar, Logo, NumResults, Search } from './components/Navigation';
import Main from './components/Main';
import Box from './components/Box';
import MovieList from './components/MovieList';
import Movie from './components/Movie';

const KEY = '2f74e8e2';

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedId, setSelectedId] = useState('')

  async function fetchMovies() {
    fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`).then((res) =>
      res.json().then((data) => setMovies(data.Search))
    );
  }

  fetchMovies();
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults />
      </NavBar>
      <Main>
        <Box><MovieList movies={movies} /></Box>
        <Box></Box>
      </Main>
    </>
  );
}

export default App;
