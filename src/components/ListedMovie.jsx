function ListedMovie({ movie }) {
  return (
      <div key={movie.imdbID} className="flex   px-6 py-4 border-b border-[#55535371]  gap-4">
        <img src={movie.Poster}  className="h-[70px]" alt={movie.Title} />
        <div> 
          <h2 className="text-lg">{movie.Title}</h2>
          <p className="text-md">{movie.Year}</p>
        </div>
      </div>
  );
}

export default ListedMovie;
