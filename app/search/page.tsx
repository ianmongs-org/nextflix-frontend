"use client";
import { movieSamples } from "@/assets";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMovies } from "@/hooks/useMovies";
import MovieCard from "@/components/movie-card";
import { Loader2, X } from "lucide-react";
import { useState } from "react";
import { Movie } from "@/app/api/movies/route";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";

function SearchPage() {
  const { data: movies, isLoading, error } = useMovies();
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);

  const handleSelectMovie = (movie: Movie) => {
    if (selectedMovies.some((m) => m.id === movie.id)) {
      toast.error(`${movie.title} is already in your list`);
      return;
    }
    if (selectedMovies.length >= 5) {
      toast.error("You can only select up to 5 movies");
      return;
    }
    toast.success(`${movie.title} added to your list`);
    setSelectedMovies([...selectedMovies, movie]);
  };

  const handleRemoveMovie = (movie: Movie) => {
    toast.success(`${movie.title} removed from your list`);
    setSelectedMovies(selectedMovies.filter((m) => m.id !== movie.id));
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
        Find Movies and Shows You{"'"}ll enjoy{" "}
        <span className="text-orange-500">NEXT</span> without The Hassle
      </h1>
      <p className="text-muted-foreground mt-4 font-sans text-sm text-center">
        Enter your favorite movies or shows and let our AI recommend the next
        one for you.
      </p>
      <div className="flex items-center justify-center mt-4 w-full max-w-xl">
        <Input
          type="text"
          placeholder="🔍 Search for a movie or show"
          className="w-full h-12 shadow-none rounded-2xl font-sans"
        />
      </div>
      <div className="mt-4">
        <div className="flex items-center justify-center flex-wrap mb-4 gap-2">
          {selectedMovies.map((movie) => {
            const imageUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
            return (
              <div
                key={movie.id}
                className="flex items-center w-[205px] border-foreground/20 border rounded-2xl p-2 gap-4 hover:bg-foreground/10 transition-all duration-300 cursor-pointer"
              >
                <X
                  className="w-4 h-4 cursor-pointer"
                  onClick={() => handleRemoveMovie(movie)}
                />

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
        <p className="text-muted-foreground font-sans text-sm text-center">
          Or select from popular searches below
        </p>
      </div>
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {isLoading && (
          <div className="flex items-center justify-center">
            <Loader2 className="w-4 h-4 animate-spin" />
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center">
            <p className="text-red-500 font-sans text-sm">
              Error loading movies: {error.message}
            </p>
          </div>
        )}
        {movies?.results.map((movie) => (
          <div
            key={movie.id}
            onClick={() => handleSelectMovie(movie)}
            className="flex items-center justify-center"
          >
            <MovieCard key={movie.id} movie={movie} />
          </div>
        ))}
      </div>
      <p className="text-muted-foreground font-sans text-xs text-center mt-4">
        Showing {movies?.results.length} results of {movies?.total_results}
      </p>
    </div>
  );
}

export default SearchPage;
