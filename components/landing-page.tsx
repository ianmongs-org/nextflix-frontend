/* eslint-disable @next/next/no-img-element */
"use client";
import Navbar from "./navbar";
import { useRandomMovie } from "@/hooks/useRandomMovie";
import { Button } from "./ui/button";
import { FaRegCalendar, FaRegClock, FaPlay, FaInfo } from "react-icons/fa";

function LandingPage() {
  const randomMovie = useRandomMovie();
  return (
    <div className="max-w-7xl mx-auto my-0 p-2 z-20">
      <section className="mb-4">
        <Navbar />
      </section>
      <div
        className="font-sans relative h-[600px] rounded-3xl w-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${randomMovie.image})`,
        }}
      >
        <div className="absolute inset-0 rounded-3xl bg-black/80 z-10"></div>
        <div className="absolute inset-0 flex flex-col justify-center items-start max-w-xl p-4 z-10">
          <h1 className="text-4xl font-bold text-white">{randomMovie.title}</h1>
          <p className="text-gray-300 leading-relaxed py-4 text-sm">
            {randomMovie.description.slice(0, 350)}...
          </p>
          <div className="flex items-center my-2 gap-2">
            {randomMovie.genre.map((genre) => (
              <span
                key={genre}
                className="text-gray-400 border border-gray-400 rounded-full px-2 py-1 w-[80px] text-center text-xs"
              >
                {genre}
              </span>
            ))}
          </div>
          <div className="flex items-center my-2 gap-4">
            {randomMovie.cast.map((actor) => (
              <div key={actor.id} className="flex items-center gap-1">
                <img
                  src={actor.image}
                  alt={actor.name}
                  className="w-14 h-14 rounded-full object-contain border border-gray-400"
                />
                <span className="text-gray-300 text-xs">{actor.name}</span>
              </div>
            ))}
          </div>
          <div className="my-4 flex items-baseline gap-4">
            <div className="">
              <img className="w-8 h-8 rounded" src="/imdb.png" alt="IMDB" />
              <span className="text-gray-300 text-sm">
                <span className="text-orange-500 text-2xl font-semibold">
                  {randomMovie.rating}
                </span>{" "}
                / 10
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegClock className="text-gray-400" />
              <span className="text-gray-300 text-sm">
                {randomMovie.duration}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <FaRegCalendar className="text-gray-400" />
              <span className="text-gray-300 text-sm">{randomMovie.year}</span>
            </div>
          </div>
          <div className="my-4 flex items-center gap-2 flex-col md:flex-row justify-between w-full">
            <Button
              variant="default"
              className="w-full text-white bg-orange-500 hover:bg-orange-600 md:w-1/2 rounded-2xl flex items-center justify-center gap-1"
              onClick={() => window.open(randomMovie.trailer, "_blank")}
            >
              <FaPlay className="size-4 text-white" />
              WatchTrailer
            </Button>
            <Button
              variant="default"
              className="w-full md:w-1/2 rounded-2xl flex items-center justify-center gap-1"
            >
              <FaInfo className="size-4" />
              More Info
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
