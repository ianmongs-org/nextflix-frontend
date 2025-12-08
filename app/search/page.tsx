import { movieSamples } from "@/assets";
import { Input } from "@/components/ui/input";
import Image from "next/image";

function page() {
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
        Enter your favorite movie or show and let our AI recommend the next one
        for you.
      </p>
      <div className="flex items-center justify-center mt-4 w-full max-w-xl">
        <Input
          type="text"
          placeholder="🔍 Search for a movie or show"
          className="w-full h-12 shadow-none rounded-2xl font-sans"
        />
      </div>
      <div className="mt-4">
        <p className="text-muted-foreground font-sans text-sm text-center">
          Start typing to see popular searches
        </p>
      </div>
    </div>
  );
}

export default page;
