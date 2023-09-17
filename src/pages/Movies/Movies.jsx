import { Link } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchSearchingMovies } from 'Api/searchMovies';
import { SearchBox } from 'components/SearchBox/SearchBox';

const Movies = () => {
  const [movies, setMovies] = useState(() => {
    const savedMovies = sessionStorage.getItem('savedMovies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

  const [query, setQuery] = useState(() => {
    const savedQuery = sessionStorage.getItem('savedQuery');
    return savedQuery || '';
  });

  const onSearch = inputValue => {
    if (inputValue === '') {
      return;
    }
    setQuery(inputValue);
    fetchMovies(inputValue);
  };

  const fetchMovies = useCallback(async searchQuery => {
    const searchingMovies = await fetchSearchingMovies(searchQuery);
    setMovies(searchingMovies);
  }, []);

  useEffect(() => {
    if (query !== '') {
      fetchMovies(query);
    }
  }, [query, fetchMovies]);

  useEffect(() => {
    sessionStorage.setItem('savedMovies', JSON.stringify(movies));
    sessionStorage.setItem('savedQuery', query);
  }, [movies, query]);

  return (
    <>
      <SearchBox onSubmit={onSearch} inputValue={query} />
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: '/movies' }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Movies;
