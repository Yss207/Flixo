import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const GPTMovieSuggestions = () => {
  const { movieResults } = useSelector((store) => store.gpt);

  // Safety Check: If no movies are loaded yet, don't show anything
  if (!movieResults) return null;

  return (
    <div className="p-4 m-4 bg-black text-white opacity-90 rounded-xl">
      {/* We use a SINGLE MovieList component. 
         This takes the array of 5 movies and arranges them 
         side-by-side automatically.
      */}
      <MovieList title={"Top Recommendations"} movies={movieResults} />
    </div> 
  );
};

export default GPTMovieSuggestions;
