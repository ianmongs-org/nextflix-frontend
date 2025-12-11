import { Recommendation } from "@/app/api/movies/route";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { Play } from "lucide-react";

function RecommendationCard({ movie }: { movie: Recommendation }) {
  const path = usePathname();

  const imageUrl = movie.posterUrl;

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
            {movie.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col justify-between w-full">
            <h1 className="text-base font-bold text-white font-sans">
              {movie.title.length > 20
                ? movie.title.slice(0, 20) + "..."
                : movie.title}
            </h1>
            <div className="flex items-center gap-2">
              {movie.genres
                .split(",")
                .slice(0, 2)
                .map((genre) => (
                  <span
                    key={genre}
                    className="text-gray-300 font-sans text-xs rounded-full px-2 py-1"
                  >
                    {genre}
                  </span>
                ))}
            </div>
            <p className="text-gray-300 border border-gray-500 rounded-full px-2 py-1 w-1/2 text-xs font-sans flex items-center gap-2 cursor-pointer justify-start mt-1">
              <a
                href={movie.trailerUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Trailer
              </a>
              <Play className="w-4 h-4" />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;
