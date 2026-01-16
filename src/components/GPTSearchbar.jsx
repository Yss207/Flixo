import React, { useRef } from "react";
import model from "../utils/gemini";
import { API_OPTIONS } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addGptMovieResult } from "../utils/gptSlice";

const GPTSearchBar = () => {
  const dispatch = useDispatch();
  const searchText = useRef(null);

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    return json.results[0];
  };

  const handleGptSearchClick = async () => {
    // (Your existing logic is perfect, keeping it as is)
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". Only give me names of 5 movies, comma separated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const result = await model.generateContent(gptQuery);
    const response = await result.response;
    const text = response.text();

    const gptMovies = text.split(",").map((movie) => movie.trim());

    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    const tmdbResults = await Promise.all(promiseArray);
    const cleanResults = tmdbResults.filter((movie) => movie !== undefined);

    dispatch(
      addGptMovieResult({ movieNames: gptMovies, movieResults: cleanResults })
    );
  };

  return (
    // 🟢 MOBILE FIX 1: 'pt-[40%]' ensures it doesn't hide behind the header on mobile
    // 🟢 MOBILE FIX 2: 'md:pt-[10%]' keeps it high up on desktop
    <div className="pt-[5%] md:pt-[2%] flex justify-center">
      <form
        // 🟢 MOBILE FIX 3: 'w-[95%]' prevents edge-touching on mobile
        className="w-[95%] md:w-1/2 bg-black grid grid-cols-12 rounded-lg"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          // 🟢 MOBILE FIX 4: Smaller padding/margins on mobile (p-2 m-2), larger on desktop
          className="p-2 m-2 md:p-4 md:m-4 col-span-9 rounded-lg bg-white text-black text-sm md:text-xl"
          placeholder="What would you like to watch today?"
        />
        <button
          className="col-span-3 m-2 md:m-4 py-2 px-2 md:px-4 bg-red-700 text-white rounded-lg hover:bg-red-800 text-sm md:text-xl"
          onClick={handleGptSearchClick}
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default GPTSearchBar;
