import { useEffect, useState } from 'react';
import StarRating from './StarRating';
import Loader from './Loader';

function MovieDetails({ selected, onSubmit }) {
  const KEY = '2f74e8e2';

  const [selectedMovie, setSelectedMovie] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { Title, Released, Poster, imdbRating, Plot } = selectedMovie;

  function handleSetRating(rating) {
    console.log(rating);
  }

  useEffect(
    function () {
      async function fetchMovieDetails() {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selected}`
        );
        const data = await res.json();
        setSelectedMovie(data);
        setIsLoading(false);
      }
      fetchMovieDetails();
    },
    [selected]
  );

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center   bg-[#343a40]">
            <img src={Poster} className="w-[120px]" />
            <div className="space-y-5 px-6">
              <h3 className="text-2xl">{Title}</h3>
              <p>{Released}</p>
              <p>⭐ {imdbRating} Average Rating</p>
            </div>
          </div>
          <div className="flex items-center justify-center py-4  ">
            <StarRating
              className=""
              onSetRating={handleSetRating}
              size={30}
              maxRating={10}
            />
          </div>

          <div className="flex justify-center ">
            <button onClick={() => onSubmit(selectedMovie)}>Add Rating</button>
          </div>
          <p className="px-5  text-justify">{Plot}</p>
        </>
      )}
    </>
  );
}

export default MovieDetails;
