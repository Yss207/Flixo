import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black">
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>
      <p className="hidden md:inline-block py-6 text-lg w-3/6">{overview}</p>

      {/* Buttons Container */}
      <div className="my-4 md:m-0 flex gap-3">
        {/* 🔴 Play Button (Red as requested) */}
        <button className="bg-red-600 text-white py-2 md:py-3 px-6 md:px-8 text-lg md:text-xl rounded-lg flex items-center gap-2 hover:bg-red-700 transition-colors duration-200">
          {/* Solid Play Icon SVG */}
          <svg
            className="w-6 h-6 md:w-8 md:h-8 fill-current"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
          <span className="font-semibold">Play</span>
        </button>

        {/* ℹ️ More Info Button (Translucent Gray) */}
        <button className="hidden md:flex items-center gap-2 bg-gray-500/70 text-white py-2 md:py-3 px-6 md:px-8 text-lg md:text-xl bg-opacity-50 rounded-lg hover:bg-gray-500/50 transition-colors duration-200">
          {/* Info Icon SVG */}
          <svg
            className="w-6 h-6 md:w-8 md:h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
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
