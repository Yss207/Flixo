// fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)

import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { API_OPTIONS } from '../utils/constants';
import { addTopRatedMovies } from '../utils/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

    const getTopRatedMovies = async () => {
        const data = await fetch(
            "/api/proxy?endpoint=movie/top_rated&page=1"
        );

        const json = await data.json();
        // console.log(json);
        dispatch(addTopRatedMovies(json.results));
    };

    useEffect(() => {
        getTopRatedMovies();
    }, []);
}

export default useTopRatedMovies;
