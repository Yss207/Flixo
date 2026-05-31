import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { db } from "../utils/firebase";
import { setWatchlist } from "../utils/watchlistSlice";
import Header from "./Header";
import MovieCard from "./MovieCard";

const Watchlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const watchlistMovies = useSelector(
    (store) => store.watchlist.watchlistMovies
  );

  useEffect(() => {
    if (!user?.uid) return;

    const fetchWatchlist = async () => {
      const colRef = collection(db, "users", user.uid, "watchlist");
      const snapshot = await getDocs(colRef);
      const movies = snapshot.docs.map((doc) => doc.data());
      dispatch(setWatchlist(movies));
    };

    fetchWatchlist();
  }, [user?.uid]);

  return (
    <div className="min-h-screen bg-black">
      <Header />

      <div className="pt-28 md:pt-32 px-4 md:px-12">
        <h1 className="text-white text-2xl md:text-3xl font-bold mb-6">
          My Watchlist
        </h1>

        {watchlistMovies.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="white"
              className="w-16 h-16 mb-4 opacity-30"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
              />
            </svg>
            <p className="text-gray-400 text-lg mb-2">
              Your watchlist is empty.
            </p>
            <p className="text-gray-600 text-sm mb-6">
              Browse movies and click the bookmark icon to save them here.
            </p>
            <button
              onClick={() => navigate("/browse")}
              className="bg-white text-black font-bold py-2 px-6 rounded hover:bg-gray-200 transition-colors"
            >
              Start Browsing
            </button>
          </div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {watchlistMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
