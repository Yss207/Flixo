import { createSlice } from "@reduxjs/toolkit";

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState: {
    watchlistMovies: [],
  },
  reducers: {
    setWatchlist: (state, action) => {
      state.watchlistMovies = action.payload;
    },
    addToWatchlist: (state, action) => {
      state.watchlistMovies.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      state.watchlistMovies = state.watchlistMovies.filter(
        (m) => m.id !== action.payload
      );
    },
  },
});

export const { setWatchlist, addToWatchlist, removeFromWatchlist } =
  watchlistSlice.actions;

export default watchlistSlice;
