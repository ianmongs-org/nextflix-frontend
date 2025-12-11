import { Movie } from "@/app/api/movies/route";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { getGenreById } from "@/constants/mock";
import { usePathname } from "next/navigation";

function MovieCard({ movie }: { movie: Movie }) {
  const path = usePathname();

  const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleClick = () => {
    if (path.includes("search")) {
      // handle select movie for recommendation
      console.log(movie);
    } else {
      //   router.push(`/search/${movie.id}`);
    }
  };
  return (
    <div
      onClick={handleClick}
      className="rounded-2xl group cursor-pointer transition-all duration-300 shadow-md w-full aspect-2/3 relative overflow-hidden"
    >
      <Image
        src={imageUrl}
        alt={movie.title}
        width={500}
        height={750}
        className="w-full h-full object-cover rounded-2xl"
      />
      <div className="absolute inset-0 group-hover:rounded-2xl transition-all duration-300 ease-in group-hover:bg-black/40 z-10"></div>
      <div className="absolute group-hover:flex transition-all duration-300 ease-in group-hover:border backdrop-blur-2xl bottom-5 left-2 right-2 hidden flex-col justify-center items-start rounded-2xl p-4 z-40">
        <div className="flex items-center my-2 gap-2 justify-between w-full">
          <span className="text-gray-300 font-sans flex items-center gap-2">
            <FaStar className="text-yellow-500" />
            {movie.vote_average.toFixed(1)}
          </span>
          <div className="flex items-center gap-2">
            {movie.genre_ids.slice(0, 2).map((genreId) => (
              <span
                key={genreId}
                className="text-gray-300 font-sans text-xs border border-gray-300 rounded-full px-2 py-1"
              >
                {getGenreById(genreId)}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col justify-between w-full">
            <h1 className="text-base font-bold text-white font-sans">
              {movie.title.length > 20
                ? movie.title.slice(0, 20) + "..."
                : movie.title}
            </h1>
            <p className="text-gray-300 text-xs font-sans">
              {movie.release_date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
