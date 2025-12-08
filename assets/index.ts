const movie1 = "/f1.webp";
const movie2 = "/hotd.jpg";
const movie3 = "/movie4.jpg";
const movie4 = "/beautyandbeast.jpg";
const movie5 = "/sinners.webp";

const banner1 = movie4;
const banner2 = "/f1-banner.jpg";

const movieSamples = [movie1, movie2, movie3, movie4, movie5];
const bannerSamples = [banner1, banner2];

export function getRandomMovie() {
  return movieSamples[Math.floor(Math.random() * movieSamples.length)];
}

export function getRandomBanner() {
  return bannerSamples[Math.floor(Math.random() * bannerSamples.length)];
}
