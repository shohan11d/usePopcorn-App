import { useEffect, useState } from 'react';

function MovieDetails({ selected, KEY }) {
  const [selectedMovie, setSelectedMovie] = useState('');
  const {
    Title: title,
    Plot: plot,
    Poster: poster,
    Language: lang,
    imdbRating,
    Year: year,
  } = selectedMovie;
  useEffect(
    function () {
      async function fetchMovies() {
        fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selected}`).then(
          (res) => res.json().then((data) => setSelectedMovie(data))
        );
      }

      fetchMovies();
    },
    [selected]
  );
  return (
    <div>
      <h1>{title}</h1>
      <img src={poster} alt="" />
      <div>
        <span>{lang}</span>
        <span>{imdbRating}</span>
        <p>{plot}</p>
      </div>
    </div>
  );
}

export default MovieDetails;
