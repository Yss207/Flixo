import React from "react";
import { IMG_CDN_URL } from "../utils/constants";

// 🟢 Receive 'movie' prop instead of 'posterPath'
const MovieCard = ({ movie }) => {
  // 1. Safety check: If no movie or no poster, don't render
  if (!movie || !movie.poster_path) return null;

  // 2. Destructure the data we need (Added 'id')
  const { id, poster_path, title, overview, release_date } = movie;

  // 🟢 SMART CLICK HANDLER:
  // Fetches the specific IMDb ID via your Proxy so the link is accurate.
  const handleCardClick = async () => {
    try {
      // 1. Ask your Proxy for the External IDs (Bypasses API blocks)
      const response = await fetch(
        `/api/proxy?endpoint=movie/${id}/external_ids`,
      );
      const json = await response.json();

      const imdbId = json.imdb_id;

      // 2. If we found the specific ID, go to that page
      if (imdbId) {
        window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
      } else {
        // 3. Fallback: If no ID exists, search by title
        const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(title)}`;
        window.open(searchUrl, "_blank");
      }
    } catch (error) {
      console.error("Failed to get IMDb ID:", error);
      // Safety Fallback
      window.open(
        `https://www.imdb.com/find?q=${encodeURIComponent(title)}`,
        "_blank",
      );
    }
  };

  return (
    <div
      className="w-36 md:w-48 pr-4 relative group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* IMAGE CONTAINER */}
      <div className="relative transition-all duration-300 ease-in-out md:group-hover:scale-110 md:group-hover:z-50">
        <img
          alt={title}
          src={IMG_CDN_URL + poster_path}
          className="rounded-md object-cover w-full h-full"
          loading="lazy"
        />

        {/* 🟢 HOVER OVERLAY (Desktop Only) */}
        {/* Fixed: 'bg-linear-to-t' -> 'bg-gradient-to-t' for standard Tailwind support */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 rounded-md flex flex-col justify-end p-3">
          <h3 className="text-white font-bold text-sm mb-1 drop-shadow-md leading-tight">
            {title}
          </h3>

          <div className="flex items-center justify-between text-[10px] text-gray-300 mb-2">
            <span>{release_date?.split("-")[0]}</span>
          </div>

          <p className="text-[10px] text-gray-200 line-clamp-3 mb-2">
            {overview}
          </p>

          <button className="bg-[#f5c518] text-black text-[10px] font-bold py-1 px-2 rounded w-fit hover:bg-[#e2b616] transition-colors">
            IMDb ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
