import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchSearchingMovies } from 'Api/searchMovies';
import { SearchBox } from 'components/SearchBox/SearchBox';

const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const location = useLocation();

  const onSearch = inputValue => {
    if (inputValue === '') {
      return;
    }
    setQuery(inputValue);
    fetchMovies();
  };

  const fetchMovies = useCallback(async () => {
    const searchingMovies = await fetchSearchingMovies(query);
    setMovies(searchingMovies);
  }, [query]);

  useEffect(() => {
    if (query !== '') {
      fetchMovies();
    }
  }, [query, fetchMovies]);

  return (
    <>
      <SearchBox onSubmit={onSearch} />
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
