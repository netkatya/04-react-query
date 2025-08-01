import axios from "axios";
import type { Movie } from "../types/movie";

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMoviesResponse {
    results: Movie[];
    total_pages: number;
}

export const fetchMovies = async (query: string, page = 1): Promise<{ results: Movie[]; total_pages: number }> => {
    const config = {
        params: { query, page },
        headers: {
            Authorization: `Bearer ${myKey}`
        }
    }
    const response = await axios.get<FetchMoviesResponse>(BASE_URL, config);
    return response.data;
}


