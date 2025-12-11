"use client";
import { movieSamples } from "@/assets";
import Image from "next/image";
import { useState } from "react";
import { Movie, Recommendation } from "@/app/api/movies/route";
import { FaStar } from "react-icons/fa";
import { useRecommendations } from "@/hooks/useMovies";
import { Loader2, Play, X } from "lucide-react";
import RecommendationCard from "@/components/recommendation-card";

const MovieModal = ({
  recommendation,
  setIsModalOpen,
}: {
  recommendation: Recommendation;
  setIsModalOpen: (isModalOpen: boolean) => void;
}) => {
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-lg flex items-center justify-center z-50">
      <div className="rounded-3xl p-4 bg-foreground/10 max-w-2xl w-full border border-gray-500 mx-1">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-sans text-white">
            {recommendation.title}
          </h1>
          <X
            className="w-4 h-4 cursor-pointer text-white"
            onClick={() => setIsModalOpen(false)}
          />
        </div>
        <div className="flex items-center gap-2">
          {recommendation.genres.split(",").map((genre: string) => (
            <span
              key={genre}
              className="text-gray-300 font-sans text-xs rounded-full px-2 py-1"
            >
              {genre}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-sans text-sm text-white">
            <FaStar className="text-yellow-500" />
            {recommendation.rating.toFixed(1)}
          </div>
          <p className="text-gray-300 hover:bg-orange-500 hover:text-white transition-all duration-300 border border-orange-500 rounded-full px-2 py-1  text-xs font-sans flex items-center gap-2 cursor-pointer justify-start mt-1">
            <a
              href={recommendation.trailerUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Trailer
            </a>
            <Play className="w-4 h-4" />
          </p>
        </div>
        <Image
          src={recommendation.posterUrl}
          alt={recommendation.title}
          width={500}
          height={750}
          className="w-[200px] h-[300px] object-cover rounded-2xl mt-4"
        />
        <p className="text-sm font-sans leading-relaxed mt-4 text-white">
          {recommendation.overview}
        </p>
      </div>
    </div>
  );
};

function RecommendedResults() {
  const [selectedMovies] = useState<Movie[]>(() => {
    if (typeof window === "undefined") return [];
    const storedMovies = sessionStorage.getItem("selectedMovies");
    if (storedMovies) {
      try {
        return JSON.parse(storedMovies);
      } catch (error) {
        console.error(
          "Error parsing selectedMovies from sessionStorage:",
          error
        );
        return [];
      }
    }
    return [];
  });
  const [selectedRecommendations, setSelectedRecommendations] =
    useState<Recommendation | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    data: recommendations,
    isLoading: isRecommendationsLoading,
    error: recommendationsError,
  } = useRecommendations(selectedMovies);

  const handleSelectRecommendation = (recommendation: Recommendation) => {
    setSelectedRecommendations(recommendation);
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto my-0 p-2 z-20 flex items-center flex-col justify-center">
      <div className="flex gap-2 mt-4">
        {movieSamples.map((movie) => (
          <div key={movie} className="">
            <Image
              src={movie}
              alt={movie}
              width={1000}
              height={1000}
              className="object-cover w-[400px] h-[400px] rounded-2xl"
            />
          </div>
        ))}
      </div>
      <h1 className="text-2xl font-bold font-sans mt-4 max-w-xl text-center">
        Based on your selected movies, we think you{"'"}ll enjoy these{" "}
        <span className="text-orange-500">NEXT</span>
      </h1>
      <p className="text-muted-foreground mt-4 font-sans text-sm text-center">
        The following movies we recommended by Azure AI based on your selected
        movies and we think you&apos;ll enjoy them.
      </p>
      {selectedMovies.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-sans font-semibold mb-2">
            Selected Movies ({selectedMovies.length}):
          </p>
          <div className="flex items-center justify-center flex-wrap mb-4 gap-2">
            {selectedMovies.map((movie) => {
              const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
              return (
                <div
                  key={movie.id}
                  className="flex items-center w-[205px] border-foreground/20 border rounded-2xl p-2 gap-4 hover:bg-foreground/10 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Image
                      src={imageUrl}
                      alt={movie.title}
                      width={100}
                      height={100}
                      className="object-cover w-[30px] h-[30px] rounded-full"
                    />
                    <div>
                      <p className="text-sm font-sans">
                        {movie.title.length > 20
                          ? movie.title.slice(0, 14) + "..."
                          : movie.title}
                      </p>
                      <span className="text-foreground/50 font-sans flex items-center gap-2 text-xs">
                        <FaStar className="text-yellow-500" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="text-sm font-sans font-semibold mb-2">
            Recommended Movies:
          </p>
          <div className="flex items-center justify-center">
            {isRecommendationsLoading && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            {recommendationsError && (
              <p className="text-red-500 font-sans text-sm">
                Error loading recommendations: {recommendationsError.message}
              </p>
            )}
            {recommendations && recommendations.recommendations.length > 0 && (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                {recommendations.recommendations.map((recommendation) => (
                  <div
                    key={recommendation.title}
                    className="flex items-center justify-center"
                    onClick={() => handleSelectRecommendation(recommendation)}
                  >
                    <RecommendationCard movie={recommendation} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
      {isModalOpen && selectedRecommendations && (
        <MovieModal
          recommendation={selectedRecommendations}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </div>
  );
}

export default RecommendedResults;
