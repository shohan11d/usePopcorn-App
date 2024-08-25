function Movie({ movie, selected, onSelect, setSelected }) {
  const { Title, Year, imdbID, Poster } = movie;
  return (
    <div className="movie" onClick={() => onSelect(movie.imdbID)}>
      <p>{Title}</p>
      <img className="poster" src={Poster} alt="" />
    </div>
  );
}

export default Movie;
