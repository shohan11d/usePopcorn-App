// import { NavBar, Search, NumResults, Logo } from './components/NavBar';
import { useState } from 'react';
import { NavBar, Logo, NumResults, Search } from './components/Navigation';
import Main from './components/Main';
import Box from './components/Box';

function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <NavBar>
        <Logo />
        <Search />
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
