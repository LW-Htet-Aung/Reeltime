import axios from "axios";

export const TMDB_CONFIG = {
  BASE_URL: "https://api.themoviedb.org/3",
  API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
  headers: {
    accpet: "application/json",
    Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`,
  },
};

export const fetchMovies = async ({ query }: { query: string }) => {
  const endpoint = query
    ? `${TMDB_CONFIG.BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
    : `${TMDB_CONFIG.BASE_URL}/discover/movie?sort_by=popularity.desc`;

  try {
    const res = await axios.get(endpoint, {
      headers: TMDB_CONFIG.headers,
    });
    if (res?.status !== 200) {
      // @ts-ignore
      throw new Error("Failed to fetch movie", res?.statusText);
    }
    return res.data.results;
  } catch (error) {
    console.log(error, "ERROR");
    throw error;
  }
};

export const fetchMovieDetails = async (
  movieId: string
): Promise<MovieDetails> => {
  try {
    const res = await axios.get(
      `${TMDB_CONFIG.BASE_URL}/movie/${movieId}?api_key=${TMDB_CONFIG.API_KEY}`,
      {
        headers: TMDB_CONFIG.headers,
      }
    );
    if (res.status !== 200) {
      throw new Error("Failed to fetch movie details");
    }
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
