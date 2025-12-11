export interface Actor {
  id: string;
  name: string;
  image: string;
}

export interface Director {
  id: string;
  name: string;
  image: string;
}

export interface Movie {
  id: string;
  title: string;
  description: string;
  trailer: string;
  image: string;
  rating: number;
  year: string;
  duration: string;
  genre: string[];
  ageRating: string;
  director: string;
  cast: Actor[];
  directors: Director[];
}

const f1_cast: Actor[] = [
  {
    id: "1",
    name: "Brad Pitt",
    image:
      "https://m.media-amazon.com/images/M/MV5BMjA1MjE2MTQ2MV5BMl5BanBnXkFtZTcwMjE5MDY0Nw@@._V1_FMjpg_UX1000_.jpg",
  },
  {
    id: "2",
    name: "Damson Idris",
    image:
      "https://m.media-amazon.com/images/M/MV5BNDg0YjMzNTMtYWE0Yi00OTZmLWIyNmYtMzkyNzVlZDYxMjYzXkEyXkFqcGc@._V1_.jpg",
  },
  {
    id: "3",
    name: "Javier Bardem",
    image:
      "https://m.media-amazon.com/images/M/MV5BMTY1NTc4NTYzMF5BMl5BanBnXkFtZTcwNDIwOTY1NA@@._V1_.jpg",
  },
];

const f1_directors: Director[] = [
  {
    id: "1",
    name: "Joseph Kosinski",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/45/Joe_Kosinski_by_Gage_Skidmore.jpg",
  },
];

const f1_movie: Movie = {
  id: "1",
  title: "F1: The Movie",
  description:
    " major sports film directed by Joseph Kosinski (Top Gun: Maverick) starring Brad Pitt as a veteran driver Sonny Hayes who comes out of retirement to mentor rookie Joshua Pearce (Damson Idris) for a struggling team (APXGP), featuring real F1 action filmed during actual race weekends for unparalleled authenticity, boasting stunning visuals, major stars (Javier Bardem, Kerry Condon), and a massive budget, becoming a huge box office hit and setting a new standard for racing movies.",
  image: "/f1-banner.jpg",
  trailer:
    "https://www.imdb.com/video/vi2863515673/?playlistId=tt16311594&ref_=tt_ov_ov_vi",
  rating: 7.7,
  year: "2025",
  duration: "2h 35m",
  genre: ["Action", "Drama", "Motorsport"],
  ageRating: "18+",
  director: f1_directors[0].name,
  cast: f1_cast,
  directors: f1_directors,
};

export const movies: Movie[] = [f1_movie];

const genresMap = new Map<number, string>([
  [28, "Action"],
  [12, "Abenteuer"],
  [16, "Animation"],
  [35, "Komödie"],
  [80, "Krimi"],
  [99, "Dokumentarfilm"],
  [18, "Drama"],
  [10751, "Familie"],
  [14, "Fantasy"],
  [36, "Historie"],
  [27, "Horror"],
  [10402, "Musik"],
  [9648, "Mystery"],
  [10749, "Liebesfilm"],
  [878, "Science Fiction"],
  [10770, "TV-Film"],
  [53, "Thriller"],
  [10752, "Kriegsfilm"],
  [37, "Western"],
]);

export function getGenreById(id: number): string | undefined {
  return genresMap.get(id);
}

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
