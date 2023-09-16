import fetch from 'node-fetch';

export const fetchMovieDetails = async movieId => {
  const url = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMTAwY2ZiNmE0OTRmMjVhOTJlMDZkMjZlYjVlYWI1NiIsInN1YiI6IjY1MDVhZjNlMzczYWMyMDEzOWZlNWJhNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.MUNmoi4YR83Q14fV3pvlEUNk3yWDik7WYaR3MnD2VS4`,
    },
  };

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Error fetching movie details:', err);
    return [];
  }
};
