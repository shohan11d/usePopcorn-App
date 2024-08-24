// import { NavBar, Search, NumResults, Logo } from './components/NavBar';
import { useState } from 'react';
import { NavBar, Logo, NumResults, Search } from './components/Navigation';
import Main from './components/Main';
import Box from './components/Box';

const KEY = "2f74e8e2"

function App() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([])


 const res = fetch(`http://www.omdbapi.com/?apikey=[${KEY}]&`).then((res)=>res.json()) 
 console.log(res)
  return (
    <>
      <NavBar>
        <Logo />
        <Search query={query} setQuery={setQuery} />
        <NumResults />
      </NavBar>
      <Main>
        <Box />
        <Box />
      </Main>
    </>
  );
}

export default App;
