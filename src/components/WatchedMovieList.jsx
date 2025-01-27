function WatchedMovieList({ watchedMovies, onDelete }) {
  const data = watchedMovies;


  function calculate(arr) {
    const sum = arr.reduce((acc, curr) => acc + curr, 0);
    return Math.floor(sum / arr.length);
  }
  return (
    <div>
      <div className="p-4 rounded-xl shadow-2xl ">
        <h3 className="uppercase text-md "> Movies You watched</h3>
        <div className="flex  justify-between py-3">
          <span>#️⃣ {data.length} movies</span>
          <span>🌟 {calculate(data.map((el) => el.imdbRating))}</span>
          <span>⏳ {calculate(data.map((el) => el.userRating))}</span>
          <span>🗓️ {calculate(data.map((el) => el.runtime))} min</span>
        </div>
      </div>
      <div>
        {data?.map((movie) => (
          <div
            key={movie.imdbID}
            className="flex   px-6 py-4 border-b border-[#55535371]  gap-4"
          >
            <img src={movie.Poster} className="h-[70px]" alt={movie.Title} />
            <div className=" flex flex-col  gap-2">
              <h2 className="text-lg">{movie.Title}</h2>
              <div className="flex gap-5 items-center">
                <p className="text-md">⏱️ {movie.runtime}</p>
                <p className="text-md">🗓️ {movie.Year}</p>
                <p className="text-md">⭐ {movie.userRating}</p>
                <button
                  className="bg-red-600"
                  onClick={() => onDelete(movie.imdbID)}
                >
                  x
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WatchedMovieList;
