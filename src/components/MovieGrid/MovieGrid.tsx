import css from './MovieGrid.module.css';
import type { Movie } from '../../types/movie';

interface MovieGridProps {
    movies: Movie[];
    onSelect: (movie: Movie) => void;
}

const MovieGrid = ({ movies, onSelect }: MovieGridProps) => {
    return (
        <ul className={css.grid}>
            {movies.map((movie) => (
                <li key={movie.id}>
                <div className={css.card} onClick={() => onSelect(movie)}>
                  <img 
                        className={css.image} 
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}  
                        alt={movie.title}
                      />
                    <h2 className={css.title}>{movie.title}</h2>
                </div>
              </li>
            ))}
        </ul>
    )
}

export default MovieGrid;