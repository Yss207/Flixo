import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    // 🟢 FIX 1: 'w-screen aspect-video' ensures it matches the background video size
    // 🟢 FIX 2: 'pt-[15%]' looks better on mobile than 20%
    // 🟢 FIX 3: 'px-6' on mobile, 'px-24' on desktop
    // 🟢 FIX 4: Changed 'bg-linear-to-r' to standard 'bg-gradient-to-r'
    <div className="w-screen aspect-video pt-[15%] px-6 md:px-24 absolute text-white bg-linear-to-r from-black">
      {/* Title: Small on mobile (2xl), Huge on desktop (6xl) */}
      <h1 className="text-2xl md:text-6xl font-bold">{title}</h1>

      {/* Overview: HIDDEN on mobile to save space, visible on desktop */}
      <p className="hidden md:inline-block py-6 text-lg w-3/6">{overview}</p>

      {/* Buttons Container */}
      <div className="my-4 md:m-0">
        <button className="bg-white text-black py-1 md:py-4 px-3 md:px-12 text-xl rounded-lg hover:opacity-80">
          ▶️ Play
        </button>

        <button className="hidden md:inline-block mx-2 bg-gray-500 text-white p-4 px-12 text-xl bg-opacity-50 rounded-lg">
          ℹ️ More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
