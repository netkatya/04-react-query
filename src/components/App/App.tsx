import { useState, useEffect } from "react";
import SearchBar from "../SearchBar/SearchBar";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { Movie } from "../../types/movie";
import { fetchMovies } from "../../services/movieService";
import MovieGrid from "../MovieGrid/MovieGrid";
import css from './App.module.css';
import MovieModal from "../MovieModal/MovieModal";
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import toast from "react-hot-toast";
import ReactPaginate from 'react-paginate';

interface MoviesResponse {
  results: Movie[];
  total_pages: number;
}

const App = () => {
    const [query, setQuery] = useState('');
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [page, setPage] = useState(1);


    const { data, isLoading, isError } = useQuery<MoviesResponse>({
        queryKey: ['movies', query, page],
        queryFn: () => fetchMovies(query, page),
        enabled: query.trim() !== '',
        placeholderData: keepPreviousData,
    });
    const movies = data?.results ?? [];
    const totalPages = data?.total_pages ?? 0;
    
        useEffect(() => {
        if (!isLoading && !isError && query.trim() !== '' && movies.length === 0) {
            toast.error('No movies found for your request.');
        }
        }, [isLoading, isError, movies, query]);
    
    const handleSearch =(newQuery:string) => {
        setQuery(newQuery);
        setPage(1);
    }
    

    return (
    <div className={css.app}>
        <SearchBar onSubmit={handleSearch} />
            {totalPages > 1 && (
            <ReactPaginate
                pageCount={totalPages}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={({ selected }) => setPage(selected + 1)}
                forcePage={page - 1}
                containerClassName={css.pagination}
                activeClassName={css.active}
                nextLabel="→"
                previousLabel="←"
            />
      )}
        {isLoading && <Loader />}
        {isError && <ErrorMessage />}
        {!isLoading && !isError && movies && movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={setSelectedMovie} />
        )}
        {selectedMovie && (
            <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
        )}
    </div>
    )
}

export default App;