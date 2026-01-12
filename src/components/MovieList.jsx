import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  if (!movies) return null;

  return (
    <div className="px-4 md:px-6">
      {" "}
      {/* 🟢 FIX 1: Less padding on mobile (px-4), normal on desktop (px-6) */}
      <h1 className="text-lg md:text-3xl py-2 md:py-4 text-white">
        {/* 🟢 FIX 2: Text is 'lg' (large) on mobile, '3xl' on desktop */}
        {title}
      </h1>
      <div className="flex overflow-x-scroll hide-scrollbar">
        <div className="flex">
          {movies.map((movie) => (
            <MovieCard key={movie.id} posterPath={movie.poster_path} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
