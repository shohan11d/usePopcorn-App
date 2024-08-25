function Movie({ movie }) {
  const { Title, Year, imdbID, Poster } = movie;
  return (
    <div className="movie">
      <p>{Title}</p>
      <img className="poster" src={Poster} alt="" />
    </div>
  );
}

export default Movie;
