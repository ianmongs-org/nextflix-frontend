import { movies } from "@/constants/mock";
import { Movie } from "@/constants/mock";

function getRandomMovie(): Movie {
  return movies[Math.floor(Math.random() * movies.length)];
}

export const useRandomMovie = () => {
  return getRandomMovie();
};
