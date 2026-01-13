import React from "react";
import MovieList from "./MovieList";
import { useSelector } from "react-redux";

const SecondaryContainer = () => {
  const movies = useSelector((store) => store.movies);

  // Safety Check: If data isn't loaded, don't render anything
  // (Prevents "cannot read property of undefined" errors)
  if (!movies || !movies.nowPlayingMovies) return null;

  return (
    <div className="bg-black">
      {/* 🟢 RESPONSIVE FIXES:
          1. 'mt-0': On mobile, start naturally below the video (so we don't cover buttons).
          2. 'md:-mt-52': On desktop, pull the list UP by ~200px to overlap the video.
          3. 'pl-4': Less padding on mobile screens.
          4. 'md:pl-12': More padding on desktop screens.
          5. 'relative z-20': Ensures this sits ON TOP of the background video.
      */}
      <div className="mt-0 md:-mt-42 pl-4 md:pl-12 relative z-20">
        <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies} />

        {/* Note: Ensure this matches your Redux slice name (likely 'popularMovies') */}
        <MovieList title={"Popular"} movies={movies.popularMovies} />

        <MovieList
          title={"Critically Acclaimed"}
          movies={movies.topRatedMovies}
        />

        <MovieList title={"Upcoming"} movies={movies.upcomingMovies} />
      </div>
    </div>
  );
};

export default SecondaryContainer;
