//fetch('https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1', options)

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addUpcomingMovies } from '../utils/movieSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();

    const getUpcomingMovies = async () => {
        const data = await fetch(
            "/api/proxy?endpoint=movie/upcoming&page=1"
        );

        const json = await data.json();
        // console.log(json);
        dispatch(addUpcomingMovies(json.results));
    };

    useEffect(() => {
        getUpcomingMovies();
    }, []);
}

export default useUpcomingMovies;
