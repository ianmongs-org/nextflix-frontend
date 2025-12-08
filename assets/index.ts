const movie1 = "/f1.webp";
const movie2 = "/hotd.jpg";
const movie3 = "/movie4.jpg";
const movie4 = "/beautyandbeast.jpg";
const movie5 = "/sinners.webp";

const movieSamples = [movie1, movie2, movie3, movie4, movie5];

export function getRandomMovie() {
  return movieSamples[Math.floor(Math.random() * movieSamples.length)];
}
