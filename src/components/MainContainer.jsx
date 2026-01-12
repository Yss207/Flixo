import React from "react";
import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);

  // Safety Check
  if (!movies) return null;

  const mainMovie = movies[Math.floor(Math.random() * movies.length)];

  // 🟢 SAFETY CHECK: If random selection failed, return null
  if (!mainMovie) return null;

  const { title, overview, id } = mainMovie;

  return (
    <div className="pt-[30%] bg-black md:pt-0">
      <VideoTitle title={title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
