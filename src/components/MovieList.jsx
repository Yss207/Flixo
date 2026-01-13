import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, id }) => {
  return (
    <div className="px-6 text-white pt-8 md:pt-0">
      {/* 🟢 THE FIX: 
          1. We move the 'id' to a wrapper around the Title.
          2. 'scroll-mt-40': On Mobile, add a huge 160px bumper (Header is tall).
          3. 'md:scroll-mt-24': On Desktop, add a smaller 96px bumper (Header is short).
      */}
      <div id={id} className="scroll-mt-40 md:scroll-mt-24">
        <h1 className="text-lg md:text-3xl py-4 font-bold">{title}</h1>
      </div>

      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex gap-4">
          {" "}
          {/* Added gap-4 for better spacing */}
          {movies?.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
