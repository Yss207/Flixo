import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies, id }) => {
  return (
    <div className="px-6 text-white pt-8 md:pt-0">
      <div id={id} className="scroll-mt-40 md:scroll-mt-24">
        <h1 className="text-lg md:text-3xl py-4 font-bold">{title}</h1>
      </div>

      <div className="flex overflow-x-scroll hide-scrollbar pb-10">
        <div className="flex gap-4">
          {movies?.map((movie) => (
            // 🟢 CRITICAL CHANGE:
            // We pass the whole 'movie' object instead of just 'posterPath'.
            // This gives the card access to title, overview, etc.
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
