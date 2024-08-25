import Movie from './Movie';
function MovieList({ movies }) {
//   console.log(movies);

  //   const { Title, Year, imdbID, Poster } = movies;
  //   console.log(Title, Year);
  return (
    <div>
      {movies?.map((movie) => (
        <Movie movie={movie} key={crypto.randomUUID} />
      ))}
    </div>
  );
}

export default MovieList;
