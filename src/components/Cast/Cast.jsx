import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchMovieCredits } from 'Api/getMovieCredits ';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const movieCredits = await fetchMovieCredits(id);

      setCast(movieCredits);
      setIsLoading(false);
    })();
  }, [id]);

  if (isLoading) {
    return <p>Loading cast...</p>;
  }

  return (
    <ul>
      {cast.map(({ id, name, profile_path, character }, index) => (
        <li key={`${id}-${index}`}>
          {profile_path ? (
            <img
              src={`https://image.tmdb.org/t/p/w500${profile_path}`}
              alt={name}
              width="150"
            />
          ) : (
            <div>No image available</div>
          )}
          <p style={{ marginTop: '5px' }}>{name}</p>
          <p style={{ marginBottom: '20px' }}>Character: {character}</p>
        </li>
      ))}
    </ul>
  );
};

export default Cast;
