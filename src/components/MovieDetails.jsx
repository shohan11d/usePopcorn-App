import StarRating from "./StarRating";

function MovieDetails({ data }) {
  const { Title, Year, Poster, runtime, imdbRating, userRating } = data[0];
  console.log(Title, Year, Poster, runtime, imdbRating, userRating);
  return (
    <div>

    <div className="flex items-center  bg-[#343a40]">
      <img src={Poster} className="w-[120px]" />
      <div className="space-y-5 px-6">
        <h3 className="text-2xl">{Title}</h3>
        <p>{Year}</p>
        <p>⭐ {imdbRating} Average Rating</p>
      </div>

    </div>
<div className="flex items-center justify-center p-5  ">

<StarRating className="" size={30} maxRating={10}/>
</div>
    </div>
  
  );
}

export default MovieDetails;
