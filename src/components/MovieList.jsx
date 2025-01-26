import ListedMovie from "./ListedMovie"

function MovieList({movies , onSelect}) {
    return (
        <div>
            {movies?.map((movie) => (
            <ListedMovie movie={movie} onSelect={onSelect} key={movie.imdbID}/>))}
        </div>
    )
}

export default MovieList
