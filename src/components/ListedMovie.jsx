function ListedMovie({ movie }) {
  return (
    <div className="h-[200px] hover:rounded-sm hover:bg-slate-700   m-2">
      <div key={movie.imdbID} className="grid grid-cols-2 items-center">
        <img src={movie.Poster} className="h-[200px]" alt={movie.Title} />
        <div>
          <h2 className="text-3xl">{movie.Title}</h2>
          <p className="text-xl">{movie.Year}</p>
        </div>
      </div>
    </div>
  );
}

export default ListedMovie;
