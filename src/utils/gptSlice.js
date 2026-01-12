import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name: "gpt",
    initialState: {
        showGPTSearch: false,
        movieNames: null,   // To store the names Gemini gave us
        movieResults: null, // To store the TMDB data
    },
    reducers: {
        toggleGPTSearchView: (state) => {
            state.showGPTSearch = !state.showGPTSearch;
        },
        // 🟢 ADD THIS REDUCER:
        addGptMovieResult: (state, action) => {
            const { movieNames, movieResults } = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
    },
});

// 🟢 CRITICAL STEP: You must export the new action here!
export const { toggleGPTSearchView, addGptMovieResult } = gptSlice.actions;

export default gptSlice.reducer;