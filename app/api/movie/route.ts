import { NextResponse } from "next/server";
export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MoviesResponse {
  results: Movie[];
  total_pages: number;
  total_results: number;
}

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
  },
};

async function getMovies(query = ""): Promise<MoviesResponse> {
  const baseUrl = process.env.BASE_URL;

  const url = `${baseUrl}/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;

  const response = await fetch(url, options);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch movies: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    const movies = await getMovies(query || "");
    return NextResponse.json(movies);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch movies: ${error}` },
      { status: 500 }
    );
  }
}
