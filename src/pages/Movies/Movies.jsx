import { Link, useLocation, useSearchParams } from 'react-router-dom';
import React, { useEffect, useState, useCallback } from 'react';
import { fetchSearchingMovies } from 'Api/searchMovies';
import { SearchBox } from 'components/SearchBox/SearchBox';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('query') || '';
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState(initialQuery);
  const [searchStarted, setSearchStarted] = useState(false);

  const location = useLocation();

  const onSearch = inputValue => {
    if (inputValue === '') {
      return;
    }
    setQuery(inputValue);
    setSearchParams(new URLSearchParams({ query: inputValue }));
    setSearchStarted(true);
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
      <SearchBox onSubmit={onSearch} inputValue={query} />
      {searchStarted && movies.length === 0 && (
        <div style={{ marginTop: '20px' }}>
          Unfortunately, we have not been able to find a video matching your
          inquiry. Please try again.
        </div>
      )}
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
