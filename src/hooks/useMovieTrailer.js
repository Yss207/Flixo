import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constants";
import { addTrailerVideo } from "../utils/movieSlice";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

    const getMovieVideos = async () => {
        // 🟢 SAFETY CHECK 1: If no ID, stop immediately.
        if (!movieId) return;

        const data = await fetch(
            `/api/proxy?endpoint=movie/${movieId}/videos`
        );

        const json = await data.json();

        // 🟢 SAFETY CHECK 2: Ensure 'results' exists before filtering
        // Sometimes the API might return an error object if the ID is invalid
        if (!json.results) return;

        const filterData = json.results.filter((video) => video.type === "Trailer");
        const trailer = filterData.length ? filterData[0] : json.results[0];

        dispatch(addTrailerVideo(trailer));
    };

    useEffect(() => {
        getMovieVideos();
    }, [movieId]); // 🟢 dependency array ensures it reruns when ID changes
};

export default useMovieTrailer;