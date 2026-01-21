import React, { useRef, useState } from "react";
import model from "../utils/gemini";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";
import { motion } from "framer-motion";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  // 🟢 UX UPGRADE: Loading State to show spinner while AI thinks
  const [isLoading, setIsLoading] = useState(false);

  // 🟢 PROXY FIX: Use your own server (Vercel) instead of calling TMDB directly
  // This ensures it works on Jio/Airtel
  const searchMovieTMDB = async (movie) => {
    try {
      const data = await fetch(
        `/api/proxy?endpoint=search/movie&query=${encodeURIComponent(movie)}&include_adult=false&language=en-US&page=1`,
      );
      const json = await data.json();
      return json.results[0]; // Return top result
    } catch (error) {
      console.error("API Error:", error);
      return null;
    }
  };

  const handleGptSearchClick = async () => {
    if (!searchText.current.value) return;

    setIsLoading(true); // Start Loading

    // 1. Get Movie Names from Gemini AI
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const result = await model.generateContent(gptQuery);
      const response = await result.response;
      const text = response.text();
      const gptMovies = text.split(",").map((movie) => movie.trim());

      // 2. Fetch Data for each movie via Proxy
      const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
      const tmdbResults = await Promise.all(promiseArray);

      // Filter out nulls (in case search fails)
      const cleanResults = tmdbResults.filter((movie) => movie);

      dispatch(
        addGptMovieResult({
          movieNames: gptMovies,
          movieResults: cleanResults,
        }),
      );
    } catch (error) {
      console.error("Gemini Error:", error);
    } finally {
      setIsLoading(false); // Stop Loading
    }
  };

  return (
    <div className="pt-[10%] md:pt-[5%] flex justify-center px-4 relative z-10">
      {/* 🟢 LUXURY FORM CONTAINER */}
      <motion.form
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full md:w-1/2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full shadow-[0_0_30px_rgba(0,0,0,0.5)] flex items-center p-2 md:p-3 overflow-hidden"
        onSubmit={(e) => e.preventDefault()}
      >
        {/* 🟢 SEARCH ICON */}
        <div className="pl-4 pr-2 text-gray-400">
          <svg
            className="w-5 h-5 md:w-6 md:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        {/* 🟢 INPUT FIELD (Transparent & Sleek) */}
        <input
          ref={searchText}
          type="text"
          className="grow bg-transparent text-white text-sm md:text-lg px-2 md:px-2 focus:outline-none placeholder-gray-400 font-light"
          placeholder="What's your mood today? (e.g. 'Funny 90s action')"
        />

        {/* 🟢 ACTION BUTTON (Gradient & Animated) */}
        <button
          className="bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-full px-5 py-2 md:px-8 md:py-3 font-semibold text-sm md:text-lg hover:shadow-[0_0_15px_rgba(129,140,248,0.6)] transition-all flex items-center gap-2 whitespace-nowrap disabled:opacity-70 disabled:cursor-not-allowed"
          onClick={handleGptSearchClick}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              {/* Spinner */}
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              <span className="hidden md:inline">Thinking...</span>
            </>
          ) : (
            <>
              {/* Sparkles Icon */}
              <span>✨</span>
              <span>Ask AI</span>
            </>
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default GPTSearchBar;
