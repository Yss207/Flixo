import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import { addToWatchlist, removeFromWatchlist } from "../utils/watchlistSlice";
import { IMG_CDN_URL } from "../utils/constants";

const MovieCard = ({ movie }) => {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const watchlistMovies = useSelector(
    (store) => store.watchlist.watchlistMovies
  );

  if (!movie || !movie.poster_path) return null;

  const { id, poster_path, title, overview, release_date } = movie;
  const isInWatchlist = watchlistMovies.some((m) => m.id === id);

  const handleCardClick = async () => {
    try {
      const response = await fetch(
        `/api/proxy?endpoint=movie/${id}/external_ids`
      );
      const json = await response.json();
      const imdbId = json.imdb_id;

      if (imdbId) {
        window.open(`https://www.imdb.com/title/${imdbId}`, "_blank");
      } else {
        window.open(
          `https://www.imdb.com/find?q=${encodeURIComponent(title)}`,
          "_blank"
        );
      }
    } catch {
      window.open(
        `https://www.imdb.com/find?q=${encodeURIComponent(title)}`,
        "_blank"
      );
    }
  };

  const handleBookmarkClick = async (e) => {
    e.stopPropagation();
    if (!user?.uid) return;

    const docRef = doc(db, "users", user.uid, "watchlist", String(id));

    if (isInWatchlist) {
      await deleteDoc(docRef);
      dispatch(removeFromWatchlist(id));
    } else {
      const movieData = { id, title, poster_path, overview, release_date };
      await setDoc(docRef, movieData);
      dispatch(addToWatchlist(movieData));
    }
  };

  return (
    <div
      className="w-36 md:w-48 pr-4 relative group cursor-pointer"
      onClick={handleCardClick}
    >
      {/* BOOKMARK BUTTON — sits on outer container so it doesn't scale with the image */}
      <button
        onClick={handleBookmarkClick}
        className="absolute top-2 right-6 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200"
        aria-label={isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
      >
        {isInWatchlist ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="#ef4444"
            className="w-6 h-6 drop-shadow-lg"
          >
            <path
              fillRule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-6 h-6 drop-shadow-lg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
            />
          </svg>
        )}
      </button>

      {/* IMAGE CONTAINER — scales on hover */}
      <div className="relative transition-all duration-300 ease-in-out md:group-hover:scale-110 md:group-hover:z-50">
        <img
          alt={title}
          src={IMG_CDN_URL + poster_path}
          className="rounded-md object-cover w-full h-full"
          loading="lazy"
        />

        {/* HOVER OVERLAY (Desktop Only) */}
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
