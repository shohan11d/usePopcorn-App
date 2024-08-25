import Movie from './Movie';
function MovieList({ movies, setSelected, onSelect }) {
//   console.log(movies);

  //   const { Title, Year, imdbID, Poster } = movies;
  //   console.log(Title, Year);
  return (
    <div>
      {movies?.map((movie) => (
        <Movie movie={movie} onSelect={onSelect} setSelected={setSelected} key={crypto.randomUUID()} />
      ))}
    </div>
  );
}

export default MovieList;
