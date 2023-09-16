import { Link, useLocation } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../Api/getTrendingMovies';
import { Suspense } from 'react';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const location = useLocation();

  useEffect(() => {
    (async () => {
      const trendingMovies = await fetchTrendingMovies();
      //   console.log(trendingMovies);
      setMovies(trendingMovies);
    })();
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </Suspense>
  );
};
export default Home;
