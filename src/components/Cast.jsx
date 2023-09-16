import { useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { fetchMovieCredits } from 'Api/getMovieCredits ';

const Cast = () => {
  const [cast, setCast] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    (async () => {
      const movieCredits = await fetchMovieCredits(id);
      //   console.log(movieCredits);
      setCast(movieCredits);
    })();
  }, [id]);

  return (
    <ul>
      {cast.map(({ id, name, profile_path, character }) => (
        <li key={id}>
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
