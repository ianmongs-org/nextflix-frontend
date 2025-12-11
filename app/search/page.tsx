"use client";
import { movieSamples } from "@/assets";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useMovie, useMovies } from "@/hooks/useMovies";
import MovieCard from "@/components/movie-card";
import { Loader2, Search, X } from "lucide-react";
import { useState, useMemo } from "react";
import { Movie } from "@/app/api/movies/route";
import { toast } from "sonner";
import { FaStar } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IMAGE_BASE_URL } from "@/constants/mock";

function SearchPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: movies, isLoading, error } = useMovies(currentPage);
  const [selectedMovies, setSelectedMovies] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const {
    data: searchedMovies,
    isLoading: isSearching,
    error: searchError,
  } = useMovie(searchQuery);
  const router = useRouter();

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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const pageNumbers = useMemo(() => {
    if (!movies?.total_pages) return [];

    const totalPages = movies.total_pages;
    const current = currentPage;
    const pages: (number | "ellipsis")[] = [];
    pages.push(1);

    const start = Math.max(2, current - 1);
    const end = Math.min(totalPages - 1, current + 1);

    if (start > 2) {
      pages.push("ellipsis");
    }

    for (let i = start; i <= end; i++) {
      if (i !== 1 && i !== totalPages) {
        pages.push(i);
      }
    }

    if (end < totalPages - 1) {
      pages.push("ellipsis");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  }, [movies?.total_pages, currentPage]);

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
        <Popover>
          <PopoverTrigger className="w-full max-w-3xl">
            <Button className="w-full max-w-xl rounded-2xl font-sans font-semibold text-foreground bg-transparent border border-foreground/20 hover:bg-foreground/10 transition-all duration-300">
              <Search className="w-4 h-4" /> Search
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[300px] rounded-2xl md:w-[500px]">
            <Input
              type="text"
              placeholder="🔍 Search for a movie or show"
              className="w-full h-12 shadow-none rounded-2xl font-sans"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {isSearching && (
              <div className="flex items-center justify-center mt-2">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            )}
            {searchError && (
              <div className="flex items-center justify-center mt-2">
                <p className="text-red-500 font-sans text-sm">
                  Error searching for movies: {searchError.message}
                </p>
              </div>
            )}
            {searchedMovies && searchedMovies.results.length > 0 && (
              <div className="">
                <div className="my-4 w-full flex gap-2 flex-col">
                  {searchedMovies.results.slice(0, 5).map((movie) => (
                    <div
                      key={movie.id}
                      className="flex items-center justify-between gap-2 pb-2 border-b border-dashed border-foreground/20 hover:bg-foreground/10 transition-all duration-300 cursor-pointer p-2"
                      onClick={() => handleSelectMovie(movie)}
                    >
                      <div className="flex items-center justify-center gap-2">
                        <Image
                          src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                          alt={movie.title}
                          width={100}
                          height={100}
                          className="object-cover w-[30px] h-[30px] rounded-full"
                        />
                        <p className="text-sm font-sans">{movie.title}</p>
                      </div>
                      <span className="text-foreground/50 font-sans flex items-center gap-2 text-xs">
                        <FaStar className="text-yellow-500" />
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                  ))}
                </div>
                <p className="text-green-500 font-sans text-xs mt-4 text-center">
                  Found {searchedMovies.results.length} movies
                </p>
              </div>
            )}
            {searchedMovies && searchedMovies.results.length === 0 && (
              <div className="flex items-center justify-center mt-2">
                <p className="text-muted-foreground font-sans text-xs mt-2">
                  No movies found
                </p>
              </div>
            )}
          </PopoverContent>
        </Popover>
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
        {selectedMovies.length > 0 && (
          <div className="flex items-center justify-center w-full">
            <Button
              onClick={() => {
                sessionStorage.setItem(
                  "selectedMovies",
                  JSON.stringify(selectedMovies)
                );
                router.push("/results");
              }}
              className="w-[400px] rounded-2xl mb-4 font-sans font-semibold"
            >
              See Recommended Results
            </Button>
          </div>
        )}
        <p className="text-muted-foreground font-sans text-sm text-center">
          Or select from popular searches below
        </p>
      </div>
      {isLoading && (
        <div className="flex items-center justify-center w-full my-2">
          <Loader2 className="w-4 h-4 animate-spin" />
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
        {error && (
          <div className="flex items-center justify-center">
            <p className="text-red-500 font-sans text-sm">
              Error loading movies: {error.message}
            </p>
          </div>
        )}
        {!isLoading &&
          movies &&
          movies?.results.map((movie) => (
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

      {movies && movies.total_pages > 1 && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (currentPage > 1) {
                    handlePageChange(currentPage - 1);
                  }
                }}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {pageNumbers.map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(page);
                    }}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  if (movies.total_pages && currentPage < movies.total_pages) {
                    handlePageChange(currentPage + 1);
                  }
                }}
                className={
                  movies.total_pages && currentPage >= movies.total_pages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

export default SearchPage;
