import ListedMovie from "./ListedMovie"

function MovieList({tempMovieData}) {
    console.log(tempMovieData)
    return (
        <div>
            {tempMovieData.map((movie) => (
            <ListedMovie movie={movie} key={movie.id}/>))}
        </div>
    )
}

export default MovieList
