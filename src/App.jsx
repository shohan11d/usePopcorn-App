import Header from './components/Header';
import Logo from './components/Logo';
import Result from './components/Result';
import Search from './components/Search';

function App() {
  return (
    <>
      <div>
        <Header>
          <Logo />
          <Search />
          <Result />
        </Header>
      </div>
    </>
  );
}

export default App;
