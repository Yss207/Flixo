import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

// 🟢 Receive 'movie' prop instead of 'posterPath'
const MovieCard = ({ movie }) => {
  // 1. Safety check: If no movie or no poster, don't render
  if (!movie || !movie.poster_path) return null;

  // 2. Destructure the data we need
  const { poster_path, title, overview, release_date } = movie;

  // 🟢 CLICK HANDLER: Opens IMDb Search
  const handleCardClick = () => {
    // encodeURIComponent handles spaces correctly (e.g. "Iron Man" -> "Iron%20Man")
    const imdbUrl = `https://www.imdb.com/find?q=${encodeURIComponent(title)}`;
    window.open(imdbUrl, "_blank");
  };

  return (
    <div
      className="w-36 md:w-48 pr-4 relative group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative transition-all duration-300 ease-in-out md:group-hover:scale-110 md:group-hover:z-50">
        <img
          alt={title} // Good for accessibility
          src={IMG_CDN_URL + poster_path}
          className="rounded-md object-cover w-full h-full"
          loading="lazy"
        />

        {/* 🟢 HOVER OVERLAY (Desktop Only) */}
        {/* Shows Title, Year, and IMDb Button on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 rounded-md flex flex-col justify-end p-3">
          <h3 className="text-white font-bold text-sm mb-1 drop-shadow-md leading-tight">
            {title}
          </h3>

          <div className="flex items-center justify-between text-[10px] text-gray-300 mb-2">
            <span>{release_date?.split("-")[0]}</span>
            <span className="border border-gray-500 px-1 rounded text-xs">
              HD
            </span>
          </div>

          <p className="text-[10px] text-gray-200 line-clamp-3 mb-2">
            {overview}
          </p>

          <button className="bg-yellow-500 text-black text-[10px] font-bold py-1 px-2 rounded w-fit hover:bg-yellow-400">
            IMDb ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
