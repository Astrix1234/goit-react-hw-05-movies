import { Link, Outlet, useLocation, useParams } from 'react-router-dom';
import React, { useEffect, useState, Suspense } from 'react';
import { fetchMovieDetails } from '../../Api/getMovieDetails';
import { BackLink } from '../../components/StyledLink/StyledLink';
import {
  Container,
  ContainerDescription,
  AdditionalInformation,
} from './MovieDetails.styled';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    const fetchDetails = async () => {
      const movieData = await fetchMovieDetails(id);
      // console.log(movieData);
      setMovie(movieData);
    };

    fetchDetails();
  }, [id]);

  useEffect(() => {
    if (location.state && location.state?.from) {
      sessionStorage.setItem('movieDetailsBackLink', location.state.from);
    }

    return () => {
      sessionStorage.removeItem('movieDetailsBackLink');
    };
  }, [location.state]);

  const backLinkHref = sessionStorage.getItem('movieDetailsBackLink') || '/';

  if (!movie) return <div>Loading...</div>;

  return (
    <main>
      <BackLink to={backLinkHref}>Go back</BackLink>
      <Container>
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        </div>
        <ContainerDescription>
          <h1>{movie.title}</h1>
          <p>User score: {Math.floor(movie.popularity)}%</p>
          <h2>Overview</h2>
          <p>{movie.overview}</p>
          <h3>Genres</h3>
          <ul>
            {movie.genres.map(genre => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        </ContainerDescription>
      </Container>
      <AdditionalInformation>
        <p>Additional information</p>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </AdditionalInformation>
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetails;
