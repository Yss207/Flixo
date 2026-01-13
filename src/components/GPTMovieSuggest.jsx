import React from "react";
import { useSelector } from "react-redux";
import { IMG_CDN_URL } from "../utils/constants";

const GPTMovieSuggestions = () => {
  const { movieResults } = useSelector((store) => store.gpt);

  if (!movieResults) return null;

  return (
    <div className="p-4 m-4 bg-black/80 text-white rounded-xl max-w-4xl mx-auto backdrop-blur-sm">
      <h1 className="text-3xl font-bold mb-6 pl-2 border-l-4 border-red-600">
        Top Recommendations
      </h1>

      <div className="flex flex-col gap-6">
        {movieResults.map((movie) => {
          if (!movie.poster_path) return null;

          return (
            <div
              key={movie.id}
              className="flex bg-gray-800/50 rounded-lg overflow-hidden shadow-lg hover:bg-gray-700/50 transition duration-300"
            >
              {/* 🟢 FIX 1: Fixed Height & Width for Posters */}
              {/* 'h-48' (mobile) and 'md:h-64' (desktop) forces uniformity */}
              <div className="w-32 md:w-40 h-48 md:h-64 shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={IMG_CDN_URL + movie.poster_path}
                  alt={movie.title}
                  loading="lazy"
                />
              </div>

              {/* COLUMN 2: Movie Details */}
              <div className="flex flex-col justify-center p-4 md:p-6 flex-1">
                <h2 className="text-xl md:text-2xl font-bold mb-2 text-white">
                  {movie.title}
                </h2>

                {/* 🟢 FIX 2: Limit Description Length */}
                {/* 'line-clamp-3' on mobile, 'md:line-clamp-5' on desktop */}
                <p className="text-gray-300 text-sm md:text-base mb-4 line-clamp-3 md:line-clamp-5">
                  {movie.overview || "No description available for this movie."}
                </p>

                <a
                  href={`https://www.google.com/search?q=watch+${movie.title}+online`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center w-fit px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-md transition-colors"
                >
                  <span>🔎 Find Where to Watch</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GPTMovieSuggestions;
