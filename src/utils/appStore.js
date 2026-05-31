import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import watchlistSlice from "./watchlistSlice";


const appStore =  configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        gpt: gptReducer,
        watchlist: watchlistSlice.reducer,
    },
});

export default appStore;