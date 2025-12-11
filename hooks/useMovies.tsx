import { MoviesResponse } from "@/app/api/movies/route";
import { useQuery } from "@tanstack/react-query";

async function fetchMovies(): Promise<MoviesResponse> {
  const response = await fetch("/api/movies");
  return response.json();
}

export const useMovies = () => {
  return useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};
