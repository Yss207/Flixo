import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addIndianMovies } from "../utils/movieSlice";

const useIndianMovies = () => {
    const dispatch = useDispatch();
    // Optimization: Don't refetch if we already have them
    const indianMovies = useSelector((store) => store.movies.indianMovies);

    const getIndianMovies = async () => {
        try {
            // 🟢 using 'discover/movie' with 'with_origin_country=IN'
            const data = await fetch(
                "/api/proxy?endpoint=discover/movie&with_origin_country=IN&sort_by=popularity.desc&page=1"
            );
            const json = await data.json();
            dispatch(addIndianMovies(json.results));
        } catch (error) {
            console.error("Failed to fetch Indian movies:", error);
        }
    };

    useEffect(() => {
        if (!indianMovies) getIndianMovies();
    }, []);
};

export default useIndianMovies;