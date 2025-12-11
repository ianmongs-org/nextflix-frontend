import {
  Movie,
  MoviesResponse,
  RecommendationsResponse,
} from "@/app/api/movies/route";
import { useQuery } from "@tanstack/react-query";

async function fetchMovies(page: number): Promise<MoviesResponse> {
  const response = await fetch(`/api/movies?page=${page}`);
  return response.json();
}

export const useMovies = (page: number = 1) => {
  return useQuery({
    queryKey: ["movies", page],
    queryFn: () => fetchMovies(page),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
};

async function getMovie(query = ""): Promise<MoviesResponse> {
  try {
    if (query === "") {
      return {
        results: [],
        total_pages: 0,
        total_results: 0,
      };
    }
    const response = await fetch(`/api/movie?query=${query}`);
    if (!response.ok) {
      throw new Error(
        `Failed to fetch movies: ${response.status} ${response.statusText}`
      );
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return {
      results: [],
      total_pages: 0,
      total_results: 0,
    };
  }
}

export const useMovie = (query: string = "") => {
  return useQuery({
    queryKey: ["movie", query],
    queryFn: () => getMovie(query),
  });
};

async function getRecommendations({
  movies,
}: {
  movies: Movie[];
}): Promise<RecommendationsResponse> {
  const titles = movies.map((movie) => movie.title);
  try {
    const baseUrl = process.env.NEXT_PUBLIC_NEXTFLIX_API;
    const response = await fetch(`${baseUrl}/api/recommendations`, {
      method: "POST",
      body: JSON.stringify({
        selectedMovies: titles,
        maxRecommendations: 5,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return {
      recommendations: [],
      reasoning: "",
      processingTimeMs: 0,
    };
  }
}

export const useRecommendations = (movies: Movie[]) => {
  return useQuery({
    queryKey: ["recommendations", movies],
    queryFn: () => getRecommendations({ movies }),
    enabled: movies.length > 0,
  });
};
