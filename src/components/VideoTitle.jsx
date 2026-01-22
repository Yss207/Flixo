import React from "react";

const VideoTitle = ({ title, overview, movieId }) => {
  const handlePlayClick = async () => {
    if (!movieId) return;

    try {
      const response = await fetch(
        `/api/proxy?endpoint=movie/${movieId}/external_ids`,
      );
      const json = await response.json();
      const imdbId = json.imdb_id;
      const url = imdbId
        ? `https://www.imdb.com/title/${imdbId}`
        : `https://www.themoviedb.org/movie/${movieId}`;
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error fetching IMDb ID:", error);
    }
  };

  return (
    // 🟢 LAYOUT FIX:
    // 1. Mobile: 'flex flex-col justify-end pb-24' -> Keeps text at the bottom.
    // 2. Desktop: Removed 'justify-center'. Used 'md:pt-[15%]' to position it perfectly from the top.
    <div
      className="
      absolute w-screen text-white top-0
      h-screen flex flex-col justify-end pb-24 px-6 bg-gradient-to-t from-black via-transparent to-transparent
      md:aspect-video md:h-full md:block md:pt-[15%] md:px-24 md:pb-0 md:bg-gradient-to-r md:from-black md:via-black/50 md:to-transparent
    "
    >
      <h1 className="text-4xl md:text-6xl font-extrabold drop-shadow-lg tracking-tight mb-3 md:mb-4 leading-none">
        {title}
      </h1>

      <p className="hidden md:inline-block py-6 text-lg w-2/5 text-gray-200 leading-relaxed font-light drop-shadow-md">
        {overview}
      </p>

      {/* Buttons Container */}
      <div className="flex items-center gap-3 md:gap-4 mt-2 md:mt-0">
        {/* Play Button */}
        <button
          onClick={handlePlayClick}
          className="group bg-gradient-to-b from-red-600 to-red-800 text-white py-2 px-6 md:py-3 md:px-8 text-lg md:text-xl rounded-lg flex items-center gap-2 transition-all hover:scale-105 shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500/30 cursor-pointer"
        >
          <div className="bg-white text-red-700 rounded-full p-1 group-hover:bg-red-100 transition-colors">
            <svg
              className="w-4 h-4 md:w-5 md:h-5 fill-current ml-0.5"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-bold tracking-wide">Play</span>
        </button>

        {/* More Info Button */}
        <button className="hidden md:flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white py-3 px-8 text-xl rounded-lg hover:bg-white/20 hover:scale-105 transition-all">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span className="font-semibold">More Info</span>
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
